import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre — OSIRIS Campo Grande",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function SobrePage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div>
        <Link href="/" className="text-sm text-slate-500 underline">
          ← Voltar ao mapa
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">OSIRIS Campo Grande</h1>
        <p className="mt-1 text-sm text-slate-500">
          Observatório experimental de dados e riscos para Campo Grande/MS — reúne, normaliza e
          apresenta dados públicos e georreferenciados de várias fontes oficiais, respondendo a uma
          pergunta concreta: o que está acontecendo em Campo Grande e no entorno agora?
        </p>
      </div>

      <Section title="Objetivo">
        <p>
          Ir além de simplesmente exibir o que uma API retorna. A aplicação transforma dado bruto em
          informação: cruza várias fontes públicas (OSIRIS, INMET, IBGE), calcula distância e
          relevância para Campo Grande, e organiza tudo em três perguntas concretas — há algo ambiental
          relevante perto? há contexto útil de cidade/mobilidade? existe algum alerta ativo agora?
        </p>
      </Section>

      <Section title="Tecnologias e fontes utilizadas">
        <ul className="list-inside list-disc">
          <li>Next.js (App Router) + TypeScript</li>
          <li>Leaflet + OpenStreetMap para o mapa (sem dependência paga)</li>
          <li>Vitest para os testes (todas as fontes externas são sempre mockadas)</li>
          <li>
            <a href="https://osirisai.live" target="_blank" rel="noreferrer" className="underline">
              OSIRIS
            </a>{" "}
            — 13 feeds geográficos + 3 de contexto global (voos, satélites, Sentinel, incêndios, clima
            severo, qualidade do ar, câmeras, infraestrutura e outros)
          </li>
          <li>
            <a href="https://apiprevmet3.inmet.gov.br" target="_blank" rel="noreferrer" className="underline">
              INMET
            </a>{" "}
            — avisos meteorológicos oficiais ativos, filtrados para os que realmente cobrem Campo Grande
          </li>
          <li>
            <a href="https://servicodados.ibge.gov.br" target="_blank" rel="noreferrer" className="underline">
              IBGE
            </a>{" "}
            — identidade territorial oficial do município (não é enriquecimento genérico sobre o Brasil)
          </li>
        </ul>
      </Section>

      <Section title="OSIRIS — a plataforma estudada">
        <p>
          A OSIRIS é uma plataforma de inteligência de dados públicos, descrita em seu repositório
          oficial como uma &ldquo;Open Source Global Intelligence Platform&rdquo;. É software livre sob
          licença <strong>MIT</strong> — código-fonte em{" "}
          <a href="https://github.com/simplifaisoul/osiris" target="_blank" rel="noreferrer" className="underline">
            github.com/simplifaisoul/osiris
          </a>
          .
        </p>
        <p>
          Esta aplicação <strong>não é afiliada oficialmente à OSIRIS, ao INMET ou ao IBGE</strong>.
          Consumimos apenas as APIs públicas que cada um expõe — não copiamos, adaptamos nem
          redistribuímos código-fonte de nenhum deles, então as obrigações da licença MIT sobre cópia de
          código não se aplicam ao nosso uso. Ainda assim, damos o crédito devido: a auditoria completa
          dos endpoints da OSIRIS está em{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">docs/osiris-api-discovery.md</code>{" "}
          e a pesquisa de fontes brasileiras adicionais em{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">docs/external-sources.md</code>, no
          repositório desta POC.
        </p>
      </Section>

      <Section title="Metodologia de filtragem geográfica">
        <p>
          As coordenadas de referência de Campo Grande estão centralizadas em um único lugar do código (
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">src/lib/osiris/geo.ts</code>). O
          raio de busca é escolhido pelo usuário (50/100/300/600km) — mudar o raio recalcula tudo:
          mapa, painel, situação e classificação.
        </p>
        <p>
          A maioria dos feeds da OSIRIS devolve dados do mundo todo, sem filtro por cidade — por isso
          calculamos a distância de cada registro até Campo Grande (fórmula de haversine) e só
          consideramos &ldquo;da região&rdquo; o que cai dentro do raio escolhido. Isso é marcado como{" "}
          <em>filtrado localmente</em>, e a interface nunca diz que a OSIRIS fez esse filtro — diz que o
          aplicativo encontrou. O único endpoint da OSIRIS que aceita coordenadas diretamente é o de
          imagens de satélite (Sentinel-1). Os avisos do INMET usam um mecanismo diferente: cada aviso já
          lista oficialmente os municípios que cobre (por código IBGE) — filtramos por esse código exato,
          não por raio nem por distância.
        </p>
      </Section>

      <Section title="O que mudou?">
        <p>
          A cada consulta, o servidor compara o resultado atual com o anterior (mesmo raio) e reporta
          diferenças por regras determinísticas e documentadas — nunca uma gravidade &ldquo;julgada&rdquo;
          por IA: novos registros, queda no número de registros, uma fonte que voltou a responder ou
          parou de responder, e nova cobertura Sentinel. A comparação fica em memória no processo do
          servidor (sem banco de dados) — funciona de forma confiável rodando localmente, mas numa função
          serverless real (Vercel) pode não persistir entre invocações diferentes; se isso se mostrar um
          problema depois de publicado, a solução correta seria um cache externo, não implementado agora.
        </p>
      </Section>

      <Section title="Política de proveniência">
        <p>Todo registro exibido guarda, quando disponível:</p>
        <ul className="list-inside list-disc">
          <li>a plataforma consultada (OSIRIS, INMET ou IBGE);</li>
          <li>o endpoint exato;</li>
          <li>quando a resposta foi consultada;</li>
          <li>o timestamp que a própria origem declarou (nunca inventado);</li>
          <li>
            o provedor upstream, quando a fonte o declara (ex.: &ldquo;NASA-FIRMS (VIIRS)&rdquo;,
            &ldquo;opensky-anon&rdquo;) — para não atribuir a nenhuma plataforma a autoria de dados
            agregados de terceiros.
          </li>
        </ul>
      </Section>

      <Section title="Limitações">
        <ul className="list-inside list-disc">
          <li>
            A maioria dos feeds da OSIRIS tem cobertura esparsa no interior do Brasil — várias
            categorias ficam sem nenhum registro para Campo Grande na maior parte do tempo. Isso é
            mostrado explicitamente na aba &ldquo;Fontes&rdquo;, nunca escondido.
          </li>
          <li>Ausência de registro não significa ausência do fenômeno no mundo real — só que a origem consultada não reportou nada para esta região agora.</li>
          <li>Nem a OSIRIS nem o INMET (via a API testada) têm um endpoint confiável de clima atual (temperatura/umidade/vento) — só eventos/avisos.</li>
          <li>Miniaturas de cenas de satélite vêm como URI <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">s3://</code>, não renderizável como imagem no navegador.</li>
          <li>Pesquisamos SIMGEO (Prefeitura de Campo Grande), IMASUL e o INPE Queimadas — nenhum tinha uma API pública simples o suficiente para integrar sem scraping frágil. Detalhes em <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">docs/external-sources.md</code>.</li>
        </ul>
      </Section>

      <Section title="Imagens dos módulos">
        <p>
          Os três módulos e o card de Campo Grande usam fotografias reais com atribuição quando uma
          imagem de licença clara e verificável foi encontrada; as demais categorias usam ilustrações
          próprias do projeto (uma imagem específica da ESA para o Sentinel, por exemplo, usava
          &ldquo;ESA Standard Licence&rdquo; em vez da política geral CC BY-SA dos dados Sentinel — na
          dúvida, optamos pela ilustração).
        </p>
        <ul className="list-inside list-disc">
          <li>
            <strong>Campo Grande / MS</strong> — Morada dos Baís, foto de Rubens Costa Marques,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Morada_dos_Ba%C3%ADs_em_2000_-_Campo_Grande_MS.jpg" target="_blank" rel="noreferrer" className="underline">
              Wikimedia Commons
            </a>
            , licença CC BY-SA 4.0.
          </li>
          <li>
            <strong>Ambiente &amp; Fogo</strong> — fotografia de astronauta ISS040-E-103496 (Amazônia),
            NASA / ISS Crew Earth Observations Facility,{" "}
            <a href="https://science.nasa.gov/earth/earth-observatory/amazon-forest-fires-84403" target="_blank" rel="noreferrer" className="underline">
              NASA Earth Observatory
            </a>
            , domínio público.
          </li>
          <li>
            <strong>Cidade &amp; Mobilidade, Situação &amp; Alertas</strong> — ilustrações vetoriais
            originais deste projeto (não são fotografias de terceiros).
          </li>
        </ul>
      </Section>

      <Section title="Privacidade">
        <p>
          Nenhum endpoint de OSINT sobre indivíduos (WHOIS, IP, Shodan, e-mail, telefone, vazamentos,
          sanções) foi integrado. Não há rastreamento de pessoas, reconhecimento facial, busca por
          residência ou qualquer correlação para identificação individual. O foco geográfico é sempre o
          ponto fixo de Campo Grande — nunca a localização de quem está usando a aplicação. Câmeras
          públicas só apareceriam quando forem públicas, legítimas, relevantes e permitidas pela fonte —
          hoje a OSIRIS não lista nenhuma com cobertura real em Campo Grande.
        </p>
      </Section>

      <Section title="Fontes e créditos">
        <p>
          <strong>OSIRIS Campo Grande é uma POC independente e não possui afiliação oficial com o
          projeto OSIRIS, o INMET ou o IBGE.</strong> Parte dos dados é obtida através das APIs públicas
          disponibilizadas pela OSIRIS. Determinados conjuntos de dados têm provedores upstream
          próprios, identificados sempre que disponíveis (ver &ldquo;Política de proveniência&rdquo;
          acima).
        </p>
        <p className="font-medium text-slate-800">Fontes efetivamente integradas nesta aplicação:</p>
        <ul className="list-inside list-disc">
          <li>
            <a href="https://osirisai.live" target="_blank" rel="noreferrer" className="underline">
              OSIRIS
            </a>{" "}
            (<a href="https://github.com/simplifaisoul/osiris" target="_blank" rel="noreferrer" className="underline">código-fonte</a>, MIT)
          </li>
          <li>NASA FIRMS (VIIRS) — focos de incêndio, via OSIRIS</li>
          <li>Element84 — cenas Sentinel-1, via OSIRIS</li>
          <li>OpenSky (opensky-anon) — voos ADS-B, via OSIRIS</li>
          <li>IODA / Georgia Tech Internet Outage Detection — interferência de rede, via OSIRIS</li>
          <li>GDACS — eventos geocodificados, via OSIRIS</li>
          <li>
            <a href="https://apiprevmet3.inmet.gov.br" target="_blank" rel="noreferrer" className="underline">
              INMET
            </a>{" "}
            — avisos meteorológicos ativos, integração direta
          </li>
          <li>
            <a href="https://servicodados.ibge.gov.br" target="_blank" rel="noreferrer" className="underline">
              IBGE
            </a>{" "}
            — identidade territorial do município, integração direta
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          Créditos de imagem de terceiros ficam na seção &ldquo;Imagens dos módulos&rdquo; acima.
          Prefeitura de Campo Grande (SIMGEO), IMASUL e INPE foram pesquisados mas não estão listados
          aqui porque nenhum dado deles é usado hoje — ver &ldquo;Limitações&rdquo; e{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">docs/external-sources.md</code>.
        </p>
        <p>POC experimental desenvolvida por Wellington Xavier.</p>
      </Section>
    </main>
  );
}
