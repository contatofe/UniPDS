# Módulo 5 - Aula 3

## COMO FUNCIONA INTELIGENCIA ARTIFICIAL NA WEB COM WEB AI

Nesse modulo utilizamos o próprio navegador para gerar a resposta de uma LLM (Gemini NANO) que roda diretamente na máquina local do usuário. Precisei fazer alguns ajustes no código original do professor, porque atualmente o chrome pede para colocar um botão que dispara o evento e não baixar automaticamente quando a página é carregada. Os parametros do model (.params de Temperature, TopK e TopP) estão desabilitados para uso diretamente no navegador via html, somente sendo possíveis em extensões chrome.
