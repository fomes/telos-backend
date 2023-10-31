const Problem = require("../models/problems");

class ProblemController {
  async create(req, res) {
    try {
      const problem = new Problem(req.body);
      await problem.save();
      res.status(201).json(problem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const problem = await Problem.findById(req.params.id).populate(
        "solutions"
      );

      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }

      const problemObject = problem.toObject();

      if (problemObject.solutions && problemObject.solutions.length > 0) {
        problemObject.solutions = problemObject.solutions.map((solution) => {
          const votesCount = solution.votes.length;
          delete solution.votes;
          solution.votesCount = votesCount;
          return solution;
        });

        return res.status(200).json(problemObject);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProblemController();
