@Entity
@Data
public class Questions {

	@Id
	@Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Vote.questionId}")
    private Int questionId;

    @Column
    @NotNull(message="{NotNull.Vote.response}")
    private BOOLEAN response;

    @Column
    @NotNull(message="{NotNull.Vote.username}")
    private String username;

}
