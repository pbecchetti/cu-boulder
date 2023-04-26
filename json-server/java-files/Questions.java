@Entity
@Data
public class Questions {

	@Id
	@Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Question.text}")
    private String text;

    @Column
    private Int timestamp;

    @Column
    private String username;

}
