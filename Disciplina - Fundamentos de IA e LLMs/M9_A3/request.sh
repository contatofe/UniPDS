source .env

API_URL="https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_SITE_URL="http://localhost:3000"
OPENROUTER_SITE_NAME="request-test"
MODEL="nvidia/nemotron-3-ultra-550b-a55b:free"

curl --silent -X POST "$API_URL" \
    -H  "Content-Type: application/json" \
    -H  "Authorization: Bearer $OPENROUTER_KEY" \
    -H  "HTTP-Referer: $OPENROUTER_SITE_URL" \
    -H  "X-Title: $OPENROUTER_SITE_NAME" \
    -d "{
        \"model\": \"$MODEL\",
        \"messages\": [
            {
            \"role\": \"user\",
            \"content\": \"how to make a house?\"
            }
        ],
        \"temperature\": 0.3,
        \"max_tokens\": 1000
        }" | jq
