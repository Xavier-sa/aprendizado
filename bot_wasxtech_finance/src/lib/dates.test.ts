import { describe, expect, it, afterEach } from "vitest";
import {
  APP_TIME_ZONE,
  civilDate,
  civilDateParts,
  todayInAppTimeZone,
  civilDaysBefore,
  addCivilMonths,
  startOfCivilMonth,
  endOfCivilMonth,
  parseNaturalDate,
  formatDateBR,
  formatRelativeDateLabel,
} from "./dates";

describe("APP_TIME_ZONE — configuração central, não hardcoded pelo projeto", () => {
  it("usa America/Campo_Grande por padrão", () => {
    expect(APP_TIME_ZONE).toBe("America/Campo_Grande");
  });
});

describe("civilDate / civilDateParts — convenção de armazenamento (meia-noite UTC = dia civil)", () => {
  it("civilDate produz exatamente meia-noite UTC do dia informado", () => {
    expect(civilDate(2026, 9, 18).toISOString()).toBe("2026-09-18T00:00:00.000Z");
  });

  it("civilDateParts lê de volta ano/mês/dia sem depender do fuso de quem lê", () => {
    expect(civilDateParts(civilDate(2026, 9, 18))).toEqual({ year: 2026, month: 9, day: 18 });
  });
});

describe("todayInAppTimeZone — 'agora' no fuso da aplicação, não no fuso local do processo", () => {
  it("meio-dia UTC de 18/09 é dia 18 em Campo Grande (UTC-4)", () => {
    const reference = new Date(Date.UTC(2026, 8, 18, 12, 0, 0));
    expect(todayInAppTimeZone(reference)).toEqual(civilDate(2026, 9, 18));
  });

  // Este é o cenário exato do bug relatado em produção: a noite em Campo
  // Grande já corresponde ao dia seguinte em UTC. Sem resolver "agora" no
  // fuso da aplicação, o servidor (Vercel, fuso local UTC) registraria
  // "hoje" como o dia 19 quando para o usuário, em Campo Grande, ainda é
  // dia 18 às 23h30.
  it("23:30 em Campo Grande (03:30 UTC do dia seguinte) ainda é o dia civil anterior", () => {
    const lateEveningInCampoGrande = new Date(Date.UTC(2026, 8, 19, 3, 30, 0));
    expect(todayInAppTimeZone(lateEveningInCampoGrande)).toEqual(civilDate(2026, 9, 18));
  });

  it("00:05 em Campo Grande (04:05 UTC do mesmo dia) é o dia civil corrente, não o anterior", () => {
    const justAfterMidnight = new Date(Date.UTC(2026, 8, 18, 4, 5, 0));
    expect(todayInAppTimeZone(justAfterMidnight)).toEqual(civilDate(2026, 9, 18));
  });
});

describe("civilDaysBefore — aritmética de dias civis, sem ambiguidade de fuso", () => {
  it("1 dia antes de 18/09 é 17/09", () => {
    expect(civilDaysBefore(civilDate(2026, 9, 18), 1)).toEqual(civilDate(2026, 9, 17));
  });

  it("2 dias antes de 01/09 cruza o mês corretamente (30/08)", () => {
    expect(civilDaysBefore(civilDate(2026, 9, 1), 2)).toEqual(civilDate(2026, 8, 30));
  });
});

describe("startOfCivilMonth / endOfCivilMonth / addCivilMonths", () => {
  it("início e fim do mês civil de setembro/2026", () => {
    const reference = new Date(Date.UTC(2026, 8, 15, 12, 0, 0));
    expect(startOfCivilMonth(reference)).toEqual(civilDate(2026, 9, 1));
    expect(endOfCivilMonth(reference).toISOString()).toBe("2026-09-30T23:59:59.999Z");
  });

  it("addCivilMonths cruza o ano nos dois sentidos", () => {
    expect(addCivilMonths(civilDate(2026, 1, 10), -1)).toEqual(civilDate(2025, 12, 10));
    expect(addCivilMonths(civilDate(2026, 12, 10), 1)).toEqual(civilDate(2027, 1, 10));
  });

  // Última noite do mês em Campo Grande já é o mês seguinte em UTC —
  // mesmo cenário do bug de "hoje", agora na fronteira do mês.
  it("23:30 em Campo Grande no último dia do mês ainda pertence ao mês corrente", () => {
    const lastNightOfSeptemberInCampoGrande = new Date(Date.UTC(2026, 9, 1, 3, 30, 0)); // 30/09 23:30 -04:00
    expect(startOfCivilMonth(lastNightOfSeptemberInCampoGrande)).toEqual(civilDate(2026, 9, 1));
  });
});

describe("parseNaturalDate — hoje / ontem / anteontem / data explícita", () => {
  const reference = new Date(Date.UTC(2026, 8, 18, 15, 0, 0)); // 18/09/2026, 11h em Campo Grande

  it("'hoje' resolve para a data civil do dia", () => {
    expect(parseNaturalDate("gastei 50 hoje", reference)).toEqual(civilDate(2026, 9, 18));
  });

  it("'ontem' resolve para exatamente um dia civil antes", () => {
    expect(parseNaturalDate("gastei 50 ontem", reference)).toEqual(civilDate(2026, 9, 17));
  });

  it("'anteontem' resolve para dois dias civis antes", () => {
    expect(parseNaturalDate("gastei 50 anteontem", reference)).toEqual(civilDate(2026, 9, 16));
  });

  it("data explícita dd/mm/yyyy é usada literalmente, sem depender de 'hoje'", () => {
    expect(parseNaturalDate("gastei 50 em 18/09/2026", reference)).toEqual(civilDate(2026, 9, 18));
  });

  it("data explícita dd/mm (sem ano) usa o ano civil corrente", () => {
    expect(parseNaturalDate("gastei 50 em 05/03", reference)).toEqual(civilDate(2026, 3, 5));
  });

  it("data inválida (31/02) não é aceita como se tivesse rolado para março", () => {
    expect(parseNaturalDate("gastei 50 em 31/02/2026", reference)).toBeNull();
  });

  it("sem nenhuma palavra de data reconhecida, retorna null", () => {
    expect(parseNaturalDate("gastei 50 no mercado", reference)).toBeNull();
  });
});

describe("formatDateBR — sempre mostra o dia civil armazenado, não o do fuso de quem exibe", () => {
  it("formata a data civil armazenada independentemente do TZ do processo", () => {
    expect(formatDateBR(civilDate(2026, 9, 18))).toBe("18/09/2026");
  });

  // Reprodução direta do bug relatado: uma transactionDate de 18/09 não
  // pode virar "17/09/2026" quando exibida — isso é o que acontecia antes
  // da correção, porque `format()` do date-fns lê o horário LOCAL de quem
  // está rodando o código (o navegador do usuário, num fuso negativo como
  // o do Brasil), e meia-noite UTC de 18/09 é 20h/21h de 17/09 em fusos
  // negativos.
  describe("simulando o navegador rodando num fuso diferente (regressão do bug relatado)", () => {
    const originalTZ = process.env.TZ;
    afterEach(() => {
      process.env.TZ = originalTZ;
    });

    it("mesmo com o processo rodando em fuso UTC-4 (Campo Grande), o dia exibido continua 18/09", () => {
      process.env.TZ = "America/Campo_Grande";
      expect(formatDateBR(civilDate(2026, 9, 18))).toBe("18/09/2026");
    });

    it("mesmo com o processo rodando em UTC, o dia exibido continua 18/09", () => {
      process.env.TZ = "UTC";
      expect(formatDateBR(civilDate(2026, 9, 18))).toBe("18/09/2026");
    });
  });
});

describe("formatRelativeDateLabel — 'Hoje'/'Ontem' calculados no fuso da aplicação", () => {
  const reference = new Date(Date.UTC(2026, 8, 18, 15, 0, 0));

  it("mostra 'Hoje' para a data civil corrente", () => {
    expect(formatRelativeDateLabel(civilDate(2026, 9, 18), reference)).toBe("Hoje");
  });

  it("mostra 'Ontem' para o dia civil anterior", () => {
    expect(formatRelativeDateLabel(civilDate(2026, 9, 17), reference)).toBe("Ontem");
  });

  it("mostra dd/MM/yyyy para qualquer outra data", () => {
    expect(formatRelativeDateLabel(civilDate(2026, 9, 10), reference)).toBe("10/09/2026");
  });
});
