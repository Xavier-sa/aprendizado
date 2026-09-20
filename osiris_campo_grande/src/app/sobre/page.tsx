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
          POC experimental para estudar como dados públicos, abertos e georreferenciados podem ser
          consultados, normalizados e apresentados tendo Campo Grande/MS como área de interesse.
        </p>
      </div>

      <Section title="Objetivo">
        <p>
          Descobrir, na prática, o que a API pública da OSIRIS consegue oferecer para uma cidade do
          interior do Brasil — e mostrar isso de forma honesta: o que existe, o que não existe, e de
          onde cada informação exibida realmente veio.
        </p>
      </Section>

      <Section title="Tecnologias utilizadas">
        <ul className="list-inside list-disc">
          <li>Next.js (App Router) + TypeScript</li>
          <li>Leaflet + OpenStreetMap para o mapa (sem dependência paga)</li>
          <li>Vitest para os testes (com a OSIRIS sempre mockada)</li>
        </ul>
      </Section>

      <Section title="OSIRIS — a plataforma estudada">
        <p>
          A <a href="https://osirisai.live" target="_blank" rel="noreferrer" className="underline">OSIRIS</a>{" "}
          é uma plataforma de inteligência de dados públicos, descrita em seu repositório oficial como
          uma &ldquo;Open Source Global Intelligence Platform&rdquo;. É software livre sob licença{" "}
          <strong>MIT</strong> — código-fonte em{" "}
          <a href="https://github.com/simplifaisoul/osiris" target="_blank" rel="noreferrer" className="underline">
            github.com/simplifaisoul/osiris
          </a>
          .
        </p>
        <p>
          Esta aplicação <strong>não é afiliada oficialmente à OSIRIS</strong>. Consumimos apenas a API
          pública que ela expõe (endpoints HTTP documentados) — não copiamos, adaptamos nem
          redistribuímos o código-fonte do projeto, então as obrigações da licença MIT sobre cópia de
          código não se aplicam ao nosso uso. Ainda assim, damos o crédito devido: a auditoria completa
          de todos os endpoints estudados está em{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">docs/osiris-api-discovery.md</code> no
          repositório desta POC.
        </p>
      </Section>

      <Section title="Metodologia de filtragem geográfica">
        <p>
          As coordenadas de referência de Campo Grande e o raio padrão de busca (300km) estão
          centralizados em um único lugar do código (
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">src/lib/osiris/geo.ts</code>). A
          maioria dos feeds da OSIRIS devolve dados do mundo todo, sem filtro por cidade — por isso
          calculamos a distância de cada registro até Campo Grande (fórmula de haversine) e só
          consideramos &ldquo;da região&rdquo; o que cai dentro do raio. Isso é marcado como{" "}
          <em>filtrado localmente</em>, para deixar claro que o filtro é nosso, não da OSIRIS. O único
          endpoint que aceita coordenadas diretamente e devolve algo pensado para aquele ponto é o de
          imagens de satélite (Sentinel-1).
        </p>
      </Section>

      <Section title="Política de proveniência">
        <p>Todo registro exibido guarda, quando disponível:</p>
        <ul className="list-inside list-disc">
          <li>a plataforma consultada (sempre OSIRIS);</li>
          <li>o endpoint exato;</li>
          <li>quando a resposta consultada;</li>
          <li>o timestamp que a própria origem declarou (nunca inventado);</li>
          <li>
            o provedor upstream, quando a OSIRIS o declara (ex.: &ldquo;NASA-FIRMS (VIIRS)&rdquo;,
            &ldquo;opensky-anon&rdquo;) — para não atribuir à OSIRIS a autoria de dados agregados de
            terceiros.
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
          <li>A OSIRIS não tem um endpoint de clima atual (temperatura/umidade/vento) — só eventos climáticos severos.</li>
          <li>Miniaturas de cenas de satélite vêm como URI <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">s3://</code>, não renderizável como imagem no navegador.</li>
        </ul>
      </Section>

      <Section title="Imagens dos cards">
        <p>
          A seção &ldquo;Explore os dados&rdquo; usa três fotografias reais, com atribuição — as
          demais categorias (sem uma foto real verificável em tempo hábil, ou cuja licença ficou
          ambígua, como uma imagem específica da ESA licenciada sob &ldquo;ESA Standard Licence&rdquo;
          em vez da política geral CC BY-SA dos dados Sentinel) usam ilustrações próprias do projeto.
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
            <strong>Incêndios</strong> — fotografia de astronauta ISS040-E-103496 (Amazônia),
            NASA / ISS Crew Earth Observations Facility,{" "}
            <a href="https://science.nasa.gov/earth/earth-observatory/amazon-forest-fires-84403" target="_blank" rel="noreferrer" className="underline">
              NASA Earth Observatory
            </a>
            , domínio público.
          </li>
          <li>
            <strong>Clima</strong> — Ciclone Nargis, NASA / MODIS Rapid Response (crédito: Jeff
            Schmaltz),{" "}
            <a href="https://science.nasa.gov/earth/earth-observatory/cyclone-nargis-8711/" target="_blank" rel="noreferrer" className="underline">
              NASA Earth Observatory
            </a>
            , domínio público.
          </li>
          <li>
            <strong>Satélites/Sentinel, Voos, Eventos, Câmeras públicas, Qualidade do ar</strong> —
            ilustrações vetoriais originais deste projeto (não são fotografias de terceiros).
          </li>
        </ul>
      </Section>

      <Section title="Privacidade">
        <p>
          Nenhum endpoint de OSINT sobre indivíduos (WHOIS, IP, Shodan, e-mail, telefone, vazamentos,
          sanções) foi integrado. Não há rastreamento de pessoas, reconhecimento facial, busca por
          residência ou qualquer correlação para identificação individual. O foco geográfico é sempre o
          ponto fixo de Campo Grande — nunca a localização de quem está usando a aplicação.
        </p>
      </Section>

      <Section title="Créditos">
        <p>
          POC experimental desenvolvida por Wellington Xavier utilizando dados e APIs públicas
          disponibilizadas pelo projeto open source{" "}
          <a href="https://osirisai.live" target="_blank" rel="noreferrer" className="underline">
            OSIRIS
          </a>{" "}
          (<a href="https://github.com/simplifaisoul/osiris" target="_blank" rel="noreferrer" className="underline">código-fonte</a>, MIT).
        </p>
        <p>
          Dados e integrações via OSIRIS e respectivos provedores upstream — cada feed pode ter uma
          origem própria além da OSIRIS (ver &ldquo;Política de proveniência&rdquo; acima e a tabela
          completa em <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">docs/osiris-api-discovery.md</code>).
          Créditos de imagem de terceiros ficam na seção &ldquo;Imagens dos cards&rdquo; acima.
        </p>
      </Section>
    </main>
  );
}
