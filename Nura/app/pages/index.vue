<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <div class="w-full max-w-3xl">
      <!-- Cabeçalho -->
      <div class="text-center mb-10">
        <h1 class="text-2xl font-semibold text-slate-800 mb-2">O que você deseja fazer?</h1>
        <p class="text-slate-500 text-sm">Selecione uma das opções abaixo para continuar</p>
      </div>

      <!-- Cards de seleção -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card: Visualizar Estudos Gerados -->
        <button
          class="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-pointer"
          @click="navigateTo('/estudos')"
        >
          <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-slate-800 mb-2">Visualizar Estudos Gerados</h2>
          <p class="text-slate-500 text-sm leading-relaxed">
            Acesse os estudos financeiros já elaborados para o seu cliente.
          </p>
          <div class="mt-6 w-full">
            <span class="inline-block w-full py-2.5 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium group-hover:bg-blue-700 transition-colors duration-200">
              Acessar
            </span>
          </div>
        </button>

        <!-- Card: Realizar Portabilidade -->
        <button
          class="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-pointer"
          @click="navigateTo('/portabilidade')"
        >
          <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-slate-800 mb-2">Realizar Portabilidade</h2>
          <p class="text-slate-500 text-sm leading-relaxed">
            Solicite a portabilidade de um plano de previdência para a Nura.
          </p>
          <div class="mt-6 w-full">
            <span class="inline-block w-full py-2.5 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium group-hover:bg-blue-700 transition-colors duration-200">
              Iniciar
            </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Página inicial de seleção
</script>
