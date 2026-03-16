export const questionPagesByTrack = {
  squad: [
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
    {
      id: "clanParticipation",
      label: "Está participando atualmente de algum grupo/clã?",
      boolean: true,
    },
    {
      id: "clanParticipationText",
      label: "Se sim, digite qual. Se não, preencha que não participa.",
      placeholder: "Clã ou comunidade da qual participa.",
      charLimit: 30,
    },
    {
      id: "groupReferral",
      label: "Como você encontrou o grupo?",
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
        "Se sim, foi possível entender as regras e o funcionamento do grupo?",
      options: ["Sim", "Não", "Um pouco, tenho dúvidas"],
    },
    {
      id: "rotatingAdministration",
      question:
        "Você gostaria de participar de um clã onde a administração é rotativa?",
      options: ["Sim", "Não", "Indiferente"],
    },
    {
      id: "cooperativePerson",
      question: "Você se considera uma pessoa cooperativa?",
      supportingText:
        "Em algumas ocasiões o grupo requer a participação, geralmente não-obrigatória, de membros.",
      options: ["Sim", "Não", "Um pouco"],
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
      id: "expectedReturn",
      label: "Expectativa sobre o clã",
      question: "E o que você espera do clã em retorno à sua participação?",
      placeholder: "Descreva o que espera receber do grupo.",
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
      id: "squadWeeklyFrequency",
      label: "Frequência semanal no Squad",
      question: "Com que frequência você joga Squad por semana?",
      options: [
        "Jogo com muita frequência",
        "Jogo com pouca frequência",
        "Raramente jogo",
      ],
    },
    {
      id: "knowsReactionServerPolicy",
      label: "Conhecimento sobre servidores REAÇÃO",
      question:
        "Você tem conhecimento e concorda que o clã SPTS não joga nos servidores REAÇÃO?",
      boolean: true,
    },
  ],
  projectReality: [
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
    {
      id: "clanParticipation",
      label: "Está participando atualmente de algum grupo/clã?",
      boolean: true,
    },
    {
      id: "clanParticipationText",
      label: "Se sim, digite qual. Se não, preencha que não participa.",
      placeholder: "Clã ou comunidade da qual participa.",
      charLimit: 30,
    },
    {
      id: "groupReferral",
      label: "Como você encontrou o grupo?",
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
        "Se sim, foi possível entender as regras e o funcionamento do grupo?",
      options: ["Sim", "Não", "Um pouco, tenho dúvidas"],
    },
    {
      id: "rotatingAdministration",
      question:
        "Você gostaria de participar de um clã onde a administração é rotativa?",
      options: ["Sim", "Não", "Indiferente"],
    },
    {
      id: "cooperativePerson",
      question: "Você se considera uma pessoa cooperativa?",
      supportingText:
        "Em algumas ocasiões o grupo requer a participação, geralmente não-obrigatória, de membros.",
      options: ["Sim", "Não", "Um pouco"],
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
      id: "expectedReturn",
      label: "Expectativa sobre o clã",
      question: "E o que você espera do clã em retorno à sua participação?",
      placeholder: "Descreva o que espera receber do grupo.",
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
      id: "prWeeklyFrequency",
      label: "Frequência semanal no PR",
      question: "Com que frequência você joga PR por semana?",
      options: [
        "Jogo com muita frequência",
        "Jogo com pouca frequência",
        "Raramente jogo",
      ],
    },
    {
      id: "knowsReactionServerPolicy",
      label: "Conhecimento sobre servidores REAÇÃO",
      question:
        "Você tem conhecimento e concorda que o clã SPTS não joga nos servidores REAÇÃO?",
      boolean: true,
    },
    {
      id: "prSelfRating",
      label: "No Project Reality, como você se define?",
      question: "No Project Reality, como você se define?",
      options: ["Novato", "Intermediário", "Experiente", "Veterano"],
    },
    {
      id: "prBestKits",
      label: "Quais destes kits básicos abaixo você tem mais habilidade?",
      question: "Quais destes kits básicos abaixo você tem mais habilidade?",
      multiSelect: true,
      options: [
        "Grenadier",
        "Rifleman",
        "Automatic Rifleman",
        "Breacher",
        "Combat Medic",
        "Anti-Tank Rifleman",
        "Nenhum",
        "Outro",
      ],
      allowOtherOption: true,
      otherOptionLabel: "Outro",
      otherOptionPlaceholder: "Se marcou Outro, informe qual kit.",
      charLimit: 120,
    },
    {
      id: "prSquadLeaderExperience",
      label: "Você tem alguma experiência como líder de esquadrão?",
      question: "Você tem alguma experiência como líder de esquadrão?",
      boolean: true,
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
      id: "readOfficialManual",
      label: "Você já leu o manual oficial do jogo alguma vez?",
      question: "Você já leu o manual oficial do jogo alguma vez?",
      supportingText: "www.realitymod.com/manual",
      boolean: true,
    },
    {
      id: "inGameName",
      label: "Qual seu nome no jogo?",
      question: "Qual seu nome no jogo?",
      placeholder: "Informe seu nick dentro do jogo.",
      charLimit: 60,
    },
  ],
};
