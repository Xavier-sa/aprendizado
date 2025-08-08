import streamlit as st
import pandas as pd
import plotly.express as px

# --- Configuração da Página ---
st.set_page_config(
    page_title="Dashboard de Linguagens e Estudos",
    page_icon="💻",
    layout="wide",
)

# --- Dados em CSV (pode colocar seu arquivo local, ou colar o CSV numa variável) ---
csv_url = "https://raw.githubusercontent.com/Xavier-sa/aprendizado/refs/heads/python/alura/ALURA/aula04/meuteste/mgg-evolucao.csv"

df = pd.read_csv(csv_url)

# --- Barra lateral para filtros ---
st.sidebar.header("Filtros")

anos = sorted(df["Ano Início"].unique())
anos_selecionados = st.sidebar.multiselect("Ano Início", anos, default=anos)

senioridades = sorted(df["Senioridade"].unique())
senioridades_selecionadas = st.sidebar.multiselect("Senioridade", senioridades, default=senioridades)

status_list = sorted(df["Status"].unique())
status_selecionados = st.sidebar.multiselect("Status", status_list, default=status_list)

areas = sorted(df["Área Principal"].dropna().unique())
areas_selecionadas = st.sidebar.multiselect("Área Principal", areas, default=areas)

# --- Filtragem ---
df_filtrado = df[
    (df["Ano Início"].isin(anos_selecionados)) &
    (df["Senioridade"].isin(senioridades_selecionadas)) &
    (df["Status"].isin(status_selecionados)) &
    (df["Área Principal"].isin(areas_selecionadas))
]

# --- Conteúdo Principal ---
st.title("💻 Dashboard de Linguagens de Programação e Estudos")
st.markdown("Explore o status do seu aprendizado nas linguagens e áreas relacionadas.")

# --- Métricas simples ---
st.subheader("Resumo")

col1, col2, col3 = st.columns(3)
col1.metric("Total de linguagens", f"{df_filtrado.shape[0]}")
col2.metric("Senioridade mais comum", df_filtrado["Senioridade"].mode().values[0] if not df_filtrado.empty else "N/A")
col3.metric("Status mais comum", df_filtrado["Status"].mode().values[0] if not df_filtrado.empty else "N/A")

st.markdown("---")

# --- Gráfico: Quantidade por Status ---
st.subheader("Quantidade de Linguagens por Status")
if not df_filtrado.empty:
    status_count = df_filtrado["Status"].value_counts().reset_index()
    status_count.columns = ["Status", "Quantidade"]
    fig_status = px.bar(status_count, x="Status", y="Quantidade", color="Status", title="Status de aprendizado")
    st.plotly_chart(fig_status, use_container_width=True)
else:
    st.warning("Nenhum dado para exibir.")

# --- Gráfico: Linguagens por Senioridade ---
st.subheader("Distribuição de Linguagens por Senioridade")
if not df_filtrado.empty:
    senioridade_count = df_filtrado["Senioridade"].value_counts().reset_index()
    senioridade_count.columns = ["Senioridade", "Quantidade"]
    fig_senioridade = px.pie(senioridade_count, values="Quantidade", names="Senioridade", title="Senioridade")
    st.plotly_chart(fig_senioridade, use_container_width=True)
else:
    st.warning("Nenhum dado para exibir.")

# --- Tabela detalhada ---
st.subheader("Detalhes das Linguagens")
st.dataframe(df_filtrado.reset_index(drop=True))

