package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A CompletedTraining.
 */
@Entity
@Table(name = "completed_training")
public class CompletedTraining implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @OneToMany(mappedBy = "completedTrainings")
    private Set<CompletedSet> completedSets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "completedTrainings", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "completedTrainings", allowSetters = true)
    private TrainingUnit trainingUnits;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public CompletedTraining startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public CompletedTraining endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Set<CompletedSet> getCompletedSets() {
        return completedSets;
    }

    public CompletedTraining completedSets(Set<CompletedSet> completedSets) {
        this.completedSets = completedSets;
        return this;
    }

    public CompletedTraining addCompletedSet(CompletedSet completedSet) {
        this.completedSets.add(completedSet);
        completedSet.setCompletedTrainings(this);
        return this;
    }

    public CompletedTraining removeCompletedSet(CompletedSet completedSet) {
        this.completedSets.remove(completedSet);
        completedSet.setCompletedTrainings(null);
        return this;
    }

    public void setCompletedSets(Set<CompletedSet> completedSets) {
        this.completedSets = completedSets;
    }

    public User getUser() {
        return user;
    }

    public CompletedTraining user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TrainingUnit getTrainingUnits() {
        return trainingUnits;
    }

    public CompletedTraining trainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits = trainingUnit;
        return this;
    }

    public void setTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits = trainingUnit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CompletedTraining)) {
            return false;
        }
        return id != null && id.equals(((CompletedTraining) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CompletedTraining{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
