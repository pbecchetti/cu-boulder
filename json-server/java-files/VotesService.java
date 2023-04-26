@Component
public class VotesService {

	private VotesRepository votesRepository;

    public VotesService(VotesRepository votesRepository) {
        this.votesRepository = votesRepository;
    }

    public List<Votes> getVotes() {
        return votesRepository.findAll();
    }

    public Users addVote(Votes votes) {
    	return votesRepository.save(votes);
    }

    @Query("select V from Vote v where v.questionId = ?#{questionId}")
    public List<VotesByQuestionId> getVoteByQuestionId(int questionId) {
        return votesRepository.findAll();
    }

}
