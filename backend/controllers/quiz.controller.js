import Quiz from "../models/quiz.model.js"
import User from "../models/user.model.js"

export const getQuizzes = async (req, res) => {
    const { searchTerm, selectedCategories, difficulty, currentPage, quizzesPerPage } = req.query;
  
    try {
      const query = {};
  
      if (searchTerm) {
        query.title = { $regex: searchTerm, $options: "i" }; // Case-insensitive regex
      }

      if (selectedCategories) {
        query.categories = { $in: selectedCategories.split(",") };
      }

      if (difficulty) {
        query.difficulty = difficulty; 
      }
  
      // Calculate the number of quizzes to skip
      const skip = (currentPage - 1) * quizzesPerPage;
      
      const quizzes = await Quiz.find(query)
            .skip(skip)
            .limit(parseInt(quizzesPerPage));

      const totalQuizzes = await Quiz.countDocuments(query);

      // const quizzes = await Quiz.find(query);
      // res.json(quizzes);
      res.json({
        quizzes,
        totalQuizzes,
        totalPages: Math.ceil(totalQuizzes / quizzesPerPage),
        currentPage: parseInt(currentPage)
      });
    } catch (err) {
      res.status(500).json({ message: "Error fetching quizzes.", error: err.message });
    }
  };

export const getQuizById = async (req, res) => {

    const { id } = req.params;
    try {
      const quiz = await Quiz.findById(id);
       //   .populate('creator', 'username');
      if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
      res.json(quiz);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching quiz details.' });
    }
  };

export const createQuiz = async (req, res) => {
    const { title, description, categories, difficulty, questions, timeLimit } = req.body;
    try {
      const newQuiz = new Quiz({
        title,
        description,
        categories,
        difficulty,
        questions,
        timeLimit,
        creator: req.user.id
      });
      await newQuiz.save();

      const user = await User.findById(req.user.id);
      user.quizzesCreated.push(newQuiz._id);
      await user.save();

      res.status(201).json({ message: 'Quiz created successfully.' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating quiz.' });
    }
  };

export const submitQuiz = async (req, res) => {
    const { quizId, username, score } = req.body; 
  
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });
  
      const user = await User.findOne({username});
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      user.quizzesTaken.push({
        quiz: quiz._id,
        score,
        totalQuestions: quiz.questions.length,  //addded total score
        date: new Date(),
      });
      await user.save();
  
      // Increment the quiz's play count
      quiz.plays += 1;
      await quiz.save();
  
      // Send the response
      res.json({
        message: 'Quiz submitted successfully.',
        score,
        totalQuestions: quiz.questions.length,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error submitting quiz attempt.', error: err.message });
    }
  };

export const deleteQuiz = async (req,res) =>{
  const { id: quizId } = req.params;
  const userId = req.user.id;  //from auth middleware

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    if (quiz.creator.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this quiz.' });
    }

    // Remove the quiz from the quizzesCreated array in the User document
    await User.findByIdAndUpdate(userId, { $pull: { quizzesCreated: quizId } });

    // Delete the quiz
    await Quiz.findByIdAndDelete(quizId);

    res.status(200).json({ message: 'Quiz deleted successfully.' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'An error occurred while deleting the quiz.' });
  }
}