package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Training schedule of a training. The User creates here\na training schedule, for example 3 split push pull leg.\nMonday: Push\nWendsday: Pull\nFriday: Leg
 */
@ApiModel(description = "Training schedule of a training. The User creates here\na training schedule, for example 3 split push pull leg.\nMonday: Push\nWendsday: Pull\nFriday: Leg")
@Entity
@Table(name = "training_schedule")
public class TrainingSchedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @ManyToOne
    @JsonIgnoreProperties(value = "trainingSchedules", allowSetters = true)
    private User user;

    @ManyToMany
    @JoinTable(name = "training_schedule_training_units",
               joinColumns = @JoinColumn(name = "training_schedule_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "training_units_id", referencedColumnName = "id"))
    private Set<TrainingUnit> trainingUnits = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "trainingSchedules", allowSetters = true)
    private Language language;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TrainingSchedule name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public TrainingSchedule startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public TrainingSchedule endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public TrainingSchedule user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<TrainingUnit> getTrainingUnits() {
        return trainingUnits;
    }

    public TrainingSchedule trainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
        return this;
    }

    public TrainingSchedule addTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.add(trainingUnit);
        trainingUnit.getTrainingSchedules().add(this);
        return this;
    }

    public TrainingSchedule removeTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.remove(trainingUnit);
        trainingUnit.getTrainingSchedules().remove(this);
        return this;
    }

    public void setTrainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
    }

    public Language getLanguage() {
        return language;
    }

    public TrainingSchedule language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrainingSchedule)) {
            return false;
        }
        return id != null && id.equals(((TrainingSchedule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrainingSchedule{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
