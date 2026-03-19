<template>
  <div class="selection-screen">
    <div class="selection-screen__inner">
      <!-- Cabeçalho -->
      <div class="selection-screen__header">
        <h1 class="selection-screen__title">O que você deseja fazer?</h1>
        <p class="selection-screen__subtitle">Selecione uma das opções abaixo para continuar</p>
      </div>

      <!-- Cards -->
      <div class="selection-cards">
        <!-- Card: Visualizar Estudos Gerados -->
        <button class="sel-card" @click="navigateTo('/estudos-gerados')">
          <div class="sel-card__icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 class="sel-card__title">Visualizar Estudos Gerados</h2>
          <p class="sel-card__desc">Acesse os estudos financeiros já elaborados para o seu cliente.</p>
          <span class="sel-card__btn">Acessar</span>
        </button>

        <!-- Card: Realizar Portabilidade -->
        <button class="sel-card" @click="navigateTo('/portabilidade')">
          <div class="sel-card__icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h2 class="sel-card__title">Realizar Portabilidade ou<br>Nova Contratação</h2>
          <p class="sel-card__desc">Solicite a portabilidade ou uma nova contratação de um plano de Previdência.</p>
          <span class="sel-card__btn">Iniciar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selection-screen {
  min-height: 100vh;
  background-color: var(--bg-app);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.selection-screen__inner {
  width: 100%;
  max-width: 680px;
}

.selection-screen__header {
  text-align: center;
  margin-bottom: 36px;
}

.selection-screen__title {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.selection-screen__subtitle {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.selection-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 560px) {
  .selection-cards { grid-template-columns: 1fr; }
}

.sel-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: var(--font-sans);
}

.sel-card:hover {
  border-color: #94a3b8;
  box-shadow: 0 2px 8px rgba(15,23,42,0.08);
}

.sel-card__icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--bg-tab-active);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--text-muted);
}

.sel-card__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
  line-height: 1.3;
}

.sel-card__desc {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0 0 20px;
  line-height: 1.5;
}

.sel-card__btn {
  display: block;
  width: 100%;
  padding: 10px 24px;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}
</style>
