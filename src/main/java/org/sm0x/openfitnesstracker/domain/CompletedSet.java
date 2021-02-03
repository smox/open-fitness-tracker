package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A CompletedSet.
 */
@Entity
@Table(name = "completed_set")
public class CompletedSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "set")
    private Integer set;

    @Column(name = "repetitions")
    private Integer repetitions;

    @OneToOne
    @JoinColumn(unique = true)
    private Weight weight;

    @ManyToOne
    @JsonIgnoreProperties(value = "completedSets", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "completedSets", allowSetters = true)
    private CompletedTraining completedTrainings;

    @ManyToOne
    @JsonIgnoreProperties(value = "completedSets", allowSetters = true)
    private Workout workouts;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSet() {
        return set;
    }

    public CompletedSet set(Integer set) {
        this.set = set;
        return this;
    }

    public void setSet(Integer set) {
        this.set = set;
    }

    public Integer getRepetitions() {
        return repetitions;
    }

    public CompletedSet repetitions(Integer repetitions) {
        this.repetitions = repetitions;
        return this;
    }

    public void setRepetitions(Integer repetitions) {
        this.repetitions = repetitions;
    }

    public Weight getWeight() {
        return weight;
    }

    public CompletedSet weight(Weight weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Weight weight) {
        this.weight = weight;
    }

    public User getUser() {
        return user;
    }

    public CompletedSet user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CompletedTraining getCompletedTrainings() {
        return completedTrainings;
    }

    public CompletedSet completedTrainings(CompletedTraining completedTraining) {
        this.completedTrainings = completedTraining;
        return this;
    }

    public void setCompletedTrainings(CompletedTraining completedTraining) {
        this.completedTrainings = completedTraining;
    }

    public Workout getWorkouts() {
        return workouts;
    }

    public CompletedSet workouts(Workout workout) {
        this.workouts = workout;
        return this;
    }

    public void setWorkouts(Workout workout) {
        this.workouts = workout;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CompletedSet)) {
            return false;
        }
        return id != null && id.equals(((CompletedSet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CompletedSet{" +
            "id=" + getId() +
            ", set=" + getSet() +
            ", repetitions=" + getRepetitions() +
            "}";
    }
}
