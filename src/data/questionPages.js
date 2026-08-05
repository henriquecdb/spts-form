import { TRACK_IDS } from "../../lib/trackIds.js";

export const questionPagesByTrack = {
  [TRACK_IDS.SQUAD]: [
    {
      id: "age",
      label: "Qual a sua idade?",
      placeholder: "Idade mínima permitida é de 15 anos.",
      charLimit: 2,
      onlyNumbers: true,
    },
    {
      id: "hasMicrophone",
      label: "Você possui microfone funcional?",
      boolean: true,
    },
    {
      id: "discordUserId",
      label: "Qual é o seu ID de usuário no Discord?",
      question:
        "Qual é o seu ID de usuário no Discord (ex: 85674234285862342)?",
      placeholder: "Ex: 85674234285862342",
      charLimit: 20,
      onlyNumbers: true,
    },
    {
      id: "inGameName",
      label: "Qual seu nick/nome no jogo?",
      question: "Qual seu nick/nome no jogo?",
      placeholder: "Informe seu nick dentro do jogo.",
      charLimit: 60,
    },
    {
      id: "groupReferral",
      label: "Como ou com quem você encontrou o grupo?",
      supportingText:
        "Qual membro do clã te indicou? A indicação é obrigatória. *",
      placeholder: "Informe como chegou ao grupo e quem indicou você.",
      longText: true,
      charLimit: 300,
    },
    {
      id: "readSpartacusCode",
      label: "Leitura do Código Spartacus",
      question: "Você leu o CÓDIGO SPARTACUS?",
      supportingText:
        "Disponível no canal mural do nosso servidor no Discord. Leia do capítulo 1 ao 6.8: você entenderá as regras e o funcionamento do grupo.",
      boolean: true,
    },
    {
      id: "understoodSpartacusCode",
      question:
        "Através do Código Máximo Spartacus, foi possível entender as regras e o funcionamento do grupo?",
      options: ["Sim", "Não", "Um pouco, tenho dúvidas"],
    },
    {
      id: "clanParticipation",
      label:
        "Você está participando de algum grupo/clã no momento? Se for o caso, digite qual. Caso contrário, indique que não participa.",
      placeholder: "Se não participa, informe que não participa.",
      boolean: false,
      charLimit: 30,
    },
    {
      id: "cooperativePerson",
      question: "Você se considera uma pessoa cooperativa?",
      supportingText:
        "Em algumas ocasiões o grupo requer a participação, geralmente não-obrigatória, de membros.",
      options: ["Sim", "Não", "Um pouco"],
    },
    {
      id: "squadSpecificTraining",
      label: "Treino específico para Squad",
      question:
        "Já fez algum treino específico para Squad? Se sim, o que foi treinado?",
      placeholder: "Descreva se já participou de treino e o que foi treinado.",
      longText: true,
      charLimit: 500,
    },
    {
      id: "squadPlayTime",
      label: "Tempo de jogo no Squad",
      question: "Há quanto tempo você joga?",
      placeholder: "Ex: 6 meses, 2 anos, desde 2021.",
      charLimit: 120,
    },
    {
      id: "squadSelfRating",
      label: "No Squad, como você se define?",
      question: "No Squad, como você se define?",
      options: ["Novato", "Intermediário", "Experiente", "Veterano"],
    },
    {
      id: "squadLeaderExperience",
      label: "Você tem alguma experiência como líder de esquadrão?",
      question: "Você tem alguma experiência como líder de esquadrão?",
      boolean: true,
    },
    {
      id: "expectedReturn",
      label: "Expectativa sobre o clã",
      question: "E o que você espera do clã em retorno à sua participação?",
      placeholder: "Descreva o que espera receber do grupo.",
      longText: true,
      charLimit: 500,
    },
    {
      id: "expectedContribution",
      label: "Sua participação no grupo",
      question: "O que podemos esperar com a sua participação no grupo?",
      placeholder: "Descreva como você pretende agregar ao grupo.",
      longText: true,
      charLimit: 500,
    },
    {
      id: "knowsReactionServerPolicy",
      label: "Conhecimento sobre servidores REAÇÃO",
      question:
        "Você tem conhecimento e concorda que o clã SPTS não joga nos servidores REAÇÃO?",
      boolean: true,
    },
  ],
  [TRACK_IDS.PROJECT_REALITY]: [
    {
      id: "age",
      label: "Qual a sua idade?",
      placeholder: "Idade mínima permitida é de 15 anos.",
      charLimit: 2,
      onlyNumbers: true,
    },
    {
      id: "hasMicrophone",
      label: "Você possui microfone funcional?",
      boolean: true,
    },
    {
      id: "discordUserId",
      label: "Qual é o seu ID de usuário no Discord?",
      question:
        "Qual é o seu ID de usuário no Discord (ex: 85674234285862342)?",
      placeholder: "Ex: 85674234285862342",
      charLimit: 20,
      onlyNumbers: true,
    },
    {
      id: "inGameName",
      label: "Qual seu nick/nome no jogo?",
      question: "Qual seu nick/nome no jogo?",
      placeholder: "Informe seu nick dentro do jogo.",
      charLimit: 60,
    },
    {
      id: "groupReferral",
      label: "Como ou com quem você encontrou o grupo?",
      supportingText:
        "Qual membro do clã te indicou? A indicação é obrigatória. *",
      placeholder: "Informe como chegou ao grupo e quem indicou você.",
      longText: true,
      charLimit: 300,
    },
    {
      id: "readSpartacusCode",
      label: "Leitura do Código Spartacus",
      question: "Você leu o CÓDIGO SPARTACUS?",
      supportingText:
        "Disponível no canal mural do nosso servidor no Discord. Leia do capítulo 1 ao 6.8: você entenderá as regras e o funcionamento do grupo.",
      boolean: true,
    },
    {
      id: "understoodSpartacusCode",
      question:
        "Através do Código Máximo Spartacus, foi possível entender as regras e o funcionamento do grupo?",
      options: ["Sim", "Não", "Um pouco, tenho dúvidas"],
    },
    {
      id: "clanParticipation",
      label:
        "Você está participando de algum grupo/clã no momento? Se for o caso, digite qual. Caso contrário, indique que não participa.",
      placeholder: "Se não participa, informe que não participa.",
      boolean: false,
      charLimit: 30,
    },
    {
      id: "cooperativePerson",
      question: "Você se considera uma pessoa cooperativa?",
      supportingText:
        "Em algumas ocasiões o grupo requer a participação, geralmente não-obrigatória, de membros.",
      options: ["Sim", "Não", "Um pouco"],
    },
    {
      id: "prBanHistory",
      label:
        "Já foi banido de algum servidor no Project Reality? Se sim, explique a situação.",
      question:
        "Já foi banido de algum servidor no Project Reality? Se sim, explique a situação.",
      placeholder: "Se já ocorreu, explique brevemente o contexto.",
      longText: true,
      charLimit: 500,
    },
    {
      id: "prSpecificTraining",
      label:
        "Já fez algum treino específico para Project Reality? Se sim, o que foi treinado?",
      question:
        "Já fez algum treino específico para Project Reality? Se sim, o que foi treinado?",
      placeholder: "Descreva se já participou de treino e o que foi treinado.",
      longText: true,
      charLimit: 500,
    },
    {
      id: "prPlayTime",
      label: "Tempo de jogo no PR",
      question: "Há quanto tempo você joga?",
      placeholder: "Ex: 6 meses, 2 anos, desde 2021.",
      charLimit: 120,
    },
    {
      id: "prSelfRating",
      label: "No Project Reality, como você se define?",
      question: "No Project Reality, como você se define?",
      options: ["Novato", "Intermediário", "Experiente", "Veterano"],
    },
    {
      id: "prSquadLeaderExperience",
      label: "Você tem alguma experiência como líder de esquadrão?",
      question: "Você tem alguma experiência como líder de esquadrão?",
      boolean: true,
    },
    {
      id: "expectedReturn",
      label: "Expectativa sobre o clã",
      question: "E o que você espera do clã em retorno à sua participação?",
      placeholder: "Descreva o que espera receber do grupo.",
      longText: true,
      charLimit: 500,
    },
    {
      id: "expectedContribution",
      label: "Sua participação no grupo",
      question: "O que podemos esperar com a sua participação no grupo?",
      placeholder: "Descreva como você pretende agregar ao grupo.",
      longText: true,
      charLimit: 500,
    },
    {
      id: "readOfficialManual",
      label: "Você já leu o manual oficial do jogo alguma vez?",
      question: "Você já leu o manual oficial do jogo alguma vez?",
      supportingText: "www.realitymod.com/manual",
      boolean: true,
    },
  ],
  [TRACK_IDS.ARMA_3]: [
    {
      id: "discordNick",
      label: "Qual é o seu usuário no Discord?",
      placeholder: "Ex: NickdoDiscord",
      charLimit: 60,
    },
    {
      id: "age",
      label: "Qual a sua idade?",
      placeholder: "Idade mínima permitida é de 15 anos.",
      charLimit: 2,
      onlyNumbers: true,
    },
    {
      id: "hasMicrophone",
      label: "Voce possui microfone funcional?",
      boolean: true,
    },
    {
      id: "discordAvailability",
      label: "Você entra no Discord com muita frequência?",
      boolean: true,
    },
  ],
};
