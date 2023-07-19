const getAllJobs = (req, res) => {
  res.json(req.user);
};

const getJob = (req, res) => {
  res.json(req.user);
};

const createJobs = (req, res) => {
  res.json(req.user);
};

const updateJobs = (req, res) => {
  res.send("Inside updateJobs Controller");
};

const deleteAllJobs = (req, res) => {
  res.send("Inside deleteAllJobs Controller");
};

const deleteJob = (req, res) => {
  res.send("Inside deleteJob Controller");
};

export { getAllJobs, getJob, createJobs, updateJobs, deleteAllJobs, deleteJob };
