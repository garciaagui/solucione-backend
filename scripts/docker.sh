#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens com cores
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Função para verificar se o Docker está rodando
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_message "$RED" "⚠️  Docker não está rodando. Por favor, inicie o Docker primeiro."
        exit 1
    fi
}

# Função para aguardar o banco de dados ficar pronto
wait_for_db() {
    print_message "$YELLOW" "🔄 Aguardando o banco de dados ficar pronto..."
    while ! docker exec solucione_db pg_isready -q -d solucione -U user > /dev/null 2>&1; do
        echo -n "."
        sleep 1
    done
    echo ""
    print_message "$GREEN" "✅ Banco de dados está pronto!"
}

case "$1" in
    "start")
        check_docker
        print_message "$YELLOW" "🚀 Iniciando containers..."
        docker compose up -d
        wait_for_db
        print_message "$GREEN" "✨ Containers iniciados com sucesso!"
        print_message "$GREEN" "📊 PgAdmin disponível em: http://localhost:5050"
        print_message "$GREEN" "🛢️  Banco de dados disponível em: localhost:5432"
        ;;
    
    "stop")
        check_docker
        print_message "$YELLOW" "🛑 Parando containers..."
        docker compose down
        print_message "$GREEN" "✅ Containers parados com sucesso!"
        ;;
    
    "restart")
        check_docker
        print_message "$YELLOW" "🔄 Reiniciando containers..."
        docker compose down
        docker compose up -d
        wait_for_db
        print_message "$GREEN" "✨ Containers reiniciados com sucesso!"
        ;;
    
    "logs")
        check_docker
        print_message "$YELLOW" "📋 Exibindo logs dos containers..."
        docker compose logs -f
        ;;
    
    "clean")
        check_docker
        print_message "$YELLOW" "🧹 Limpando containers e volumes..."
        docker compose down -v
        print_message "$GREEN" "✅ Limpeza concluída!"
        ;;
    
    *)
        print_message "$YELLOW" "📚 Uso: ./scripts/docker.sh [comando]"
        echo ""
        echo "Comandos disponíveis:"
        echo "  start   - Inicia os containers"
        echo "  stop    - Para os containers"
        echo "  restart - Reinicia os containers"
        echo "  logs    - Exibe os logs dos containers"
        echo "  clean   - Remove containers e volumes"
        exit 1
        ;;
esac 