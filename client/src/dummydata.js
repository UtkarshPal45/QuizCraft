const quizData = [
    {
      title: "Science Quiz",
      description: "Test your knowledge of basic science concepts!",
      categories: "science",
      difficulty: "Easy",
      questionCount: 3,
      questions: [
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "O2", "H2", "HO2"],
          correctAnswer: "H2O",
        },
        {
          question: "What planet is known as the Red Planet?",
          options: ["Earth", "Venus", "Mars", "Jupiter"],
          correctAnswer: "Mars",
        },
        {
          question: "What gas do plants primarily use for photosynthesis?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
          correctAnswer: "Carbon Dioxide",
        },
      ],
    },
    {
      title: "World History Quiz",
      description: "Explore the key events in world history!",
      categories: "history",
      difficulty: "Medium",
      questionCount: 2,
      questions: [
        {
          question: "Who was the first President of the United States?",
          options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
          correctAnswer: "George Washington",
        },
        {
          question: "In which year did World War II end?",
          options: ["1942", "1945", "1950", "1939"],
          correctAnswer: "1945",
        },
      ],
    },
    {
      title: "Math Challenge",
      description: "Solve these challenging math problems!",
      categories: "math",
      difficulty: "Hard",
      questionCount: 3,
      questions: [
        {
          question: "What is the derivative of x^2?",
          options: ["2x", "x", "x^2", "0"],
          correctAnswer: "2x",
        },
        {
          question: "What is the value of pi (\u03c0) rounded to two decimal places?",
          options: ["3.14", "3.15", "3.13", "3.12"],
          correctAnswer: "3.14",
        },
        {
          question: "What is 12 x 8?",
          options: ["96", "98", "92", "94"],
          correctAnswer: "96",
        },
      ],
    },
    {
      title: "Literature Trivia",
      description: "Dive into the world of books and authors!",
      categories: "literature",
      difficulty: "Easy",
      questionCount: 2,
      questions: [
        {
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["William Shakespeare", "Charles Dickens", "J.K. Rowling", "Mark Twain"],
          correctAnswer: "William Shakespeare",
        },
        {
          question: "What is the first book of the Bible?",
          options: ["Exodus", "Genesis", "Leviticus", "Numbers"],
          correctAnswer: "Genesis",
        },
      ],
    },
    {
      title: "Geography Quiz",
      description: "Test your knowledge of the world's geography!",
      categories: "geography",
      difficulty: "Medium",
      questionCount: 3,
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Paris", "Berlin", "Madrid", "Rome"],
          correctAnswer: "Paris",
        },
        {
          question: "Which is the largest desert in the world?",
          options: ["Sahara", "Arctic", "Antarctic", "Gobi"],
          correctAnswer: "Antarctic",
        },
        {
          question: "What is the longest river in the world?",
          options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
          correctAnswer: "Amazon",
        },
      ],
    },
    {
      title: "Music Trivia",
      description: "Discover fascinating facts about music!",
      categories: "music",
      difficulty: "Easy",
      questionCount: 2,
      questions: [
        {
          question: "Who is known as the 'King of Pop'?",
          options: ["Elvis Presley", "Michael Jackson", "Freddie Mercury", "Prince"],
          correctAnswer: "Michael Jackson",
        },
        {
          question: "Which instrument has 88 keys?",
          options: ["Guitar", "Violin", "Piano", "Flute"],
          correctAnswer: "Piano",
        },
      ],
    },
    {
      title: "Technology Quiz",
      description: "Test your knowledge about tech innovations!",
      categories: "Technology",
      difficulty: "Medium",
      questionCount: 3,
      questions: [
        {
          question: "Who is considered the father of the computer?",
          options: ["Alan Turing", "Charles Babbage", "Tim Berners-Lee", "Bill Gates"],
          correctAnswer: "Charles Babbage",
        },
        {
          question: "What does HTTP stand for?",
          options: ["HyperText Transfer Protocol", "Hyperlink Text Process", "HyperText Transfer Platform", "HyperText Technical Protocol"],
          correctAnswer: "HyperText Transfer Protocol",
        },
        {
          question: "What year was the first iPhone released?",
          options: ["2005", "2007", "2009", "2010"],
          correctAnswer: "2007",
        },
      ],
    },
    {
      title: "Sports Quiz",
      description: "Show off your sports knowledge!",
      categories: "sports",
      difficulty: "Hard",
      questionCount: 3,
      questions: [
        {
          question: "How many players are there in a soccer team?",
          options: ["9", "10", "11", "12"],
          correctAnswer: "11",
        },
        {
          question: "Who holds the record for the most Olympic gold medals?",
          options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"],
          correctAnswer: "Michael Phelps",
        },
        {
          question: "What is the maximum score in 10-pin bowling?",
          options: ["200", "250", "300", "350"],
          correctAnswer: "300",
        },
      ],
    },
    {
      title: "Programming Basics",
      description: "Test your programming knowledge!",
      categories: "programming",
      difficulty: "Medium",
      questionCount: 2,
      questions: [
        {
          question: "What does 'HTML' stand for?",
          options: ["Hyperlink Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyperlink Transfer Markup Language"],
          correctAnswer: "HyperText Markup Language",
        },
        {
          question: "Which language is primarily used for Android development?",
          options: ["Python", "Java", "C++", "Ruby"],
          correctAnswer: "Java",
        },
      ],
    },
    {
      title: "Health and Wellness Quiz",
      description: "Learn about health and wellness!",
      categories: "health",
      difficulty: "Easy",
      questionCount: 3,
      questions: [
        {
          question: "What is the recommended daily water intake for adults?",
          options: ["1 liter", "2 liters", "3 liters", "4 liters"],
          correctAnswer: "2 liters",
        },
        {
          question: "Which vitamin is primarily obtained from sunlight?",
          options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
          correctAnswer: "Vitamin D",
        },
        {
          question: "What is the normal body temperature in Celsius?",
          options: ["36.5", "37", "37.5", "38"],
          correctAnswer: "37",
        },
      ],
    },
    {
      title: "Movies and Cinema",
      description: "Test your movie knowledge!",
      categories: "movies",
      difficulty: "Medium",
      questionCount: 3,
      questions: [
        {
          question: "Who directed 'Inception'?",
          options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Martin Scorsese"],
          correctAnswer: "Christopher Nolan",
        },
        {
          question: "Which movie won the first-ever Academy Award for Best Picture?",
          options: ["Wings", "The Broadway Melody", "All Quiet on the Western Front", "Cimarron"],
          correctAnswer: "Wings",
        },
        {
          question: "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings'?",
          options: ["Samwise", "Frodo", "Pippin", "Merry"],
          correctAnswer: "Frodo",
        },
      ],
    },
  ];
  
  export default quizData;
  