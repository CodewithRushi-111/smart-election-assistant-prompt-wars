import Election from '../models/Election.js';

export const getElections = async (req, res) => {
  try {
    const { state, type } = req.query;
    let query = {};
    if (state) query.state = state;
    if (type) query.type = type;

    const elections = await Election.find(query);
    res.status(200).json({ success: true, data: elections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }
    res.status(200).json({ success: true, data: election });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getElectionTimeline = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }
    
    // Timeline logic based on phases, registrationDeadline, resultDate
    const timeline = {
      phases: election.phases,
      keyDates: [
        { name: 'Registration Deadline', date: election.registrationDeadline },
        { name: 'Result Day', date: election.resultDate }
      ]
    };

    res.status(200).json({ success: true, data: timeline });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLiveUpdates = async (req, res) => {
  try {
    // Mocking live updates for demonstration
    const updates = {
      overallTurnout: '45.2%',
      lastUpdated: new Date()
    };
    res.status(200).json({ success: true, data: updates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
