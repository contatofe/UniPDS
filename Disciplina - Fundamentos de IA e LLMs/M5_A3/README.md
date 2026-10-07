# Módulo 5 - Aula 3

## COMO FUNCIONA INTELIGENCIA ARTIFICIAL NA WEB COM WEB AI

Nesse modulo utilizamos o próprio navegador para gerar a resposta de uma LLM (Gemini NANO) que roda diretamente na máquina local do usuário. Precisei fazer alguns ajustes no código original do professor, porque atualmente o chrome pede para colocar um botão que dispara o evento e não baixar automaticamente quando a página é carregada. Os parametros do model (.params de Temperature, TopK e TopP) estão desabilitados para uso diretamente no navegador via html, somente sendo possíveis em extensões chrome. Também é necessário inicializar o servidor local e não apenas rodar o html no navegador, segundo novas boas práticas do chrome.

---

Rode no terminal um dos códigos abaixo para inicializar o servidor local:

```python
# Python
python3 -m http.server 8000 --bind 127.0.0.1
```

```js
// JavaScript
npx http-server . -p 8000 -a 127.0.0.1
```
