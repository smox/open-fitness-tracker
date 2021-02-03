package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

import org.sm0x.openfitnesstracker.domain.enumeration.DayOfWeek;

/**
 * A TrainingUnit.
 */
@Entity
@Table(name = "training_unit")
public class TrainingUnit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week")
    private DayOfWeek dayOfWeek;

    @Column(name = "time")
    private String time;

    @Column(name = "pause_time")
    private Duration pauseTime;

    @Column(name = "warumup_time")
    private Duration warumupTime;

    @Column(name = "preworkout_countdown_time")
    private Duration preworkoutCountdownTime;

    @OneToMany(mappedBy = "trainingUnits")
    private Set<CompletedTraining> completedTrainings = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "trainingUnits", allowSetters = true)
    private User user;

    @ManyToMany
    @JoinTable(name = "training_unit_workouts",
               joinColumns = @JoinColumn(name = "training_unit_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "workouts_id", referencedColumnName = "id"))
    private Set<Workout> workouts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "trainingUnits", allowSetters = true)
    private Language language;

    @ManyToMany(mappedBy = "trainingUnits")
    @JsonIgnore
    private Set<TrainingSchedule> trainingSchedules = new HashSet<>();

    @ManyToMany(mappedBy = "trainingUnits")
    @JsonIgnore
    private Set<Media> medias = new HashSet<>();

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

    public TrainingUnit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public TrainingUnit dayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        return this;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getTime() {
        return time;
    }

    public TrainingUnit time(String time) {
        this.time = time;
        return this;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Duration getPauseTime() {
        return pauseTime;
    }

    public TrainingUnit pauseTime(Duration pauseTime) {
        this.pauseTime = pauseTime;
        return this;
    }

    public void setPauseTime(Duration pauseTime) {
        this.pauseTime = pauseTime;
    }

    public Duration getWarumupTime() {
        return warumupTime;
    }

    public TrainingUnit warumupTime(Duration warumupTime) {
        this.warumupTime = warumupTime;
        return this;
    }

    public void setWarumupTime(Duration warumupTime) {
        this.warumupTime = warumupTime;
    }

    public Duration getPreworkoutCountdownTime() {
        return preworkoutCountdownTime;
    }

    public TrainingUnit preworkoutCountdownTime(Duration preworkoutCountdownTime) {
        this.preworkoutCountdownTime = preworkoutCountdownTime;
        return this;
    }

    public void setPreworkoutCountdownTime(Duration preworkoutCountdownTime) {
        this.preworkoutCountdownTime = preworkoutCountdownTime;
    }

    public Set<CompletedTraining> getCompletedTrainings() {
        return completedTrainings;
    }

    public TrainingUnit completedTrainings(Set<CompletedTraining> completedTrainings) {
        this.completedTrainings = completedTrainings;
        return this;
    }

    public TrainingUnit addCompletedTraining(CompletedTraining completedTraining) {
        this.completedTrainings.add(completedTraining);
        completedTraining.setTrainingUnits(this);
        return this;
    }

    public TrainingUnit removeCompletedTraining(CompletedTraining completedTraining) {
        this.completedTrainings.remove(completedTraining);
        completedTraining.setTrainingUnits(null);
        return this;
    }

    public void setCompletedTrainings(Set<CompletedTraining> completedTrainings) {
        this.completedTrainings = completedTrainings;
    }

    public User getUser() {
        return user;
    }

    public TrainingUnit user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public TrainingUnit workouts(Set<Workout> workouts) {
        this.workouts = workouts;
        return this;
    }

    public TrainingUnit addWorkouts(Workout workout) {
        this.workouts.add(workout);
        workout.getTrainingUnits().add(this);
        return this;
    }

    public TrainingUnit removeWorkouts(Workout workout) {
        this.workouts.remove(workout);
        workout.getTrainingUnits().remove(this);
        return this;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }

    public Language getLanguage() {
        return language;
    }

    public TrainingUnit language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<TrainingSchedule> getTrainingSchedules() {
        return trainingSchedules;
    }

    public TrainingUnit trainingSchedules(Set<TrainingSchedule> trainingSchedules) {
        this.trainingSchedules = trainingSchedules;
        return this;
    }

    public TrainingUnit addTrainingSchedules(TrainingSchedule trainingSchedule) {
        this.trainingSchedules.add(trainingSchedule);
        trainingSchedule.getTrainingUnits().add(this);
        return this;
    }

    public TrainingUnit removeTrainingSchedules(TrainingSchedule trainingSchedule) {
        this.trainingSchedules.remove(trainingSchedule);
        trainingSchedule.getTrainingUnits().remove(this);
        return this;
    }

    public void setTrainingSchedules(Set<TrainingSchedule> trainingSchedules) {
        this.trainingSchedules = trainingSchedules;
    }

    public Set<Media> getMedias() {
        return medias;
    }

    public TrainingUnit medias(Set<Media> media) {
        this.medias = media;
        return this;
    }

    public TrainingUnit addMedias(Media media) {
        this.medias.add(media);
        media.getTrainingUnits().add(this);
        return this;
    }

    public TrainingUnit removeMedias(Media media) {
        this.medias.remove(media);
        media.getTrainingUnits().remove(this);
        return this;
    }

    public void setMedias(Set<Media> media) {
        this.medias = media;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TrainingUnit)) {
            return false;
        }
        return id != null && id.equals(((TrainingUnit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TrainingUnit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", dayOfWeek='" + getDayOfWeek() + "'" +
            ", time='" + getTime() + "'" +
            ", pauseTime='" + getPauseTime() + "'" +
            ", warumupTime='" + getWarumupTime() + "'" +
            ", preworkoutCountdownTime='" + getPreworkoutCountdownTime() + "'" +
            "}";
    }
}
