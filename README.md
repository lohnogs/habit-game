# Habit Game

Pequeno aplicativo web para criar e acompanhar hábitos diários, feito com **HTML**, **CSS** e **JavaScript puro**.

---

## ✨ Funcionalidades

| Funcionalidade         | Descrição                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------- |
| **Adicionar hábito**   | Crie quantos hábitos quiser através do formulário no topo.                            |
| **Checklist semanal**  | Grade com sete caixas de seleção (Seg → Dom) para cada hábito.                        |
| **Excluir hábito**     | Botão que remove o hábito e seus dados.                                               |
| **Limpar semana**      | Botão “Limpar semana” desmarca todos os dias, mas mantém o hábito.                    |
| **Sistema de níveis**  | Cada marcação concede XP. Alcance classes (Soldado, Mago, Bárbaro …) e suba de nível. |
| **Tema claro/escuro**  | Alternância instantânea via botão no cabeçalho.                                       |
| **Persistência local** | Todos os dados ficam no `localStorage`; não precisa de servidor.                      |

---

## 🚀 Como rodar localmente

```bash
# 1. Clone o repositório
$ git clone https://github.com/lohnogs/habit-game.git

# 2. Abra a pasta
$ cd habit-game

# 3. Inicie
# Não há build: basta abrir o arquivo
$ start index.html          # Windows
où
$ xdg-open index.html       # Linux
```

> Qualquer navegador moderno (Chrome, Edge, Firefox, Safari …) já é suficiente.

---

## 📂 Estrutura

```
habit-game/
├── index.html   # Estrutura da página
├── style.css    # Estilos, temas e responsividade
└── script.js    # Lógica de hábitos, níveis e salvamento
```

---

## 🔧 Personalização rápida

| O que alterar          | Onde mexer                       |
| ---------------------- | -------------------------------- |
| Cores / tema           | Variáveis `:root` em `style.css` |
| Classes e XP por nível | Array `classes` em `script.js`   |
| Textos / idioma        | Textos diretos no HTML/JS        |


