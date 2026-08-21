# VERUM NODE - Configuração de Chaves API

## Status Atual (2025-07-14 05:35 UTC)

### ✅ Funcionais
- **VERUM AI v1 (Claude)**: Antropic API configurada e funcionando
- **VERUM AI v4 (Gemini)**: Google API configurada e funcionando

### ❌ Necessárias
- **VERUM AI v3 (Mistral)**: Chave inválida/não autorizada
- **VERUM AI v2 (Llama)**: HuggingFace API não configurada

## Como Obter Chaves Válidas

### Mistral AI
1. Acesse: https://console.mistral.ai/
2. Faça login ou crie conta
3. Vá em "API Keys" no painel
4. Gere nova chave API
5. Verifique se há créditos/billing ativo

### HuggingFace
1. Acesse: https://huggingface.co/settings/tokens
2. Faça login na conta
3. Crie novo token com permissão "Read"
4. Copie o token gerado

## Configuração no VERUM NODE

### Método 1: Variáveis de Ambiente
```bash
export MISTRAL_API_KEY="sua_chave_mistral_aqui"
export HUGGINGFACE_API_KEY="sua_chave_huggingface_aqui"
```

### Método 2: Arquivo .env
```
MISTRAL_API_KEY=sua_chave_mistral_aqui
HUGGINGFACE_API_KEY=sua_chave_huggingface_aqui
```

## Verificação
Após configurar, teste com:
```bash
curl http://localhost:5000/api/mistral/chat -X POST -H "Content-Type: application/json" -d '{"message":"teste"}'
curl http://localhost:5000/api/huggingface/chat -X POST -H "Content-Type: application/json" -d '{"message":"teste"}'
```

## Objetivo Final
**QUADRUPLE AI VERUM**: 4 sistemas de IA operacionais simultaneamente
- v1: Claude (Anthropic) ✅
- v2: Llama (HuggingFace) ❌
- v3: Mistral (Mistral AI) ❌  
- v4: Gemini (Google) ✅

---
**VERUM NODE**: Sistema enterprise preparado para demonstrações universitárias e reunião Replit/Brasília.