package org.sm0x.openfitnesstracker.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Language.
 */
@Entity
@Table(name = "language")
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "short_name")
    private String shortName;

    @OneToMany(mappedBy = "selectedLanguage")
    private Set<UserSettings> userSettings = new HashSet<>();

    @OneToMany(mappedBy = "language")
    private Set<TrainingSchedule> trainingSchedules = new HashSet<>();

    @OneToMany(mappedBy = "language")
    private Set<TrainingUnit> trainingUnits = new HashSet<>();

    @OneToMany(mappedBy = "language")
    private Set<Workout> workouts = new HashSet<>();

    @OneToMany(mappedBy = "language")
    private Set<Unit> units = new HashSet<>();

    @OneToMany(mappedBy = "language")
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

    public Language name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public Language shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Set<UserSettings> getUserSettings() {
        return userSettings;
    }

    public Language userSettings(Set<UserSettings> userSettings) {
        this.userSettings = userSettings;
        return this;
    }

    public Language addUserSettings(UserSettings userSettings) {
        this.userSettings.add(userSettings);
        userSettings.setSelectedLanguage(this);
        return this;
    }

    public Language removeUserSettings(UserSettings userSettings) {
        this.userSettings.remove(userSettings);
        userSettings.setSelectedLanguage(null);
        return this;
    }

    public void setUserSettings(Set<UserSettings> userSettings) {
        this.userSettings = userSettings;
    }

    public Set<TrainingSchedule> getTrainingSchedules() {
        return trainingSchedules;
    }

    public Language trainingSchedules(Set<TrainingSchedule> trainingSchedules) {
        this.trainingSchedules = trainingSchedules;
        return this;
    }

    public Language addTrainingSchedules(TrainingSchedule trainingSchedule) {
        this.trainingSchedules.add(trainingSchedule);
        trainingSchedule.setLanguage(this);
        return this;
    }

    public Language removeTrainingSchedules(TrainingSchedule trainingSchedule) {
        this.trainingSchedules.remove(trainingSchedule);
        trainingSchedule.setLanguage(null);
        return this;
    }

    public void setTrainingSchedules(Set<TrainingSchedule> trainingSchedules) {
        this.trainingSchedules = trainingSchedules;
    }

    public Set<TrainingUnit> getTrainingUnits() {
        return trainingUnits;
    }

    public Language trainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
        return this;
    }

    public Language addTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.add(trainingUnit);
        trainingUnit.setLanguage(this);
        return this;
    }

    public Language removeTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.remove(trainingUnit);
        trainingUnit.setLanguage(null);
        return this;
    }

    public void setTrainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public Language workouts(Set<Workout> workouts) {
        this.workouts = workouts;
        return this;
    }

    public Language addWorkouts(Workout workout) {
        this.workouts.add(workout);
        workout.setLanguage(this);
        return this;
    }

    public Language removeWorkouts(Workout workout) {
        this.workouts.remove(workout);
        workout.setLanguage(null);
        return this;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }

    public Set<Unit> getUnits() {
        return units;
    }

    public Language units(Set<Unit> units) {
        this.units = units;
        return this;
    }

    public Language addUnits(Unit unit) {
        this.units.add(unit);
        unit.setLanguage(this);
        return this;
    }

    public Language removeUnits(Unit unit) {
        this.units.remove(unit);
        unit.setLanguage(null);
        return this;
    }

    public void setUnits(Set<Unit> units) {
        this.units = units;
    }

    public Set<Media> getMedias() {
        return medias;
    }

    public Language medias(Set<Media> media) {
        this.medias = media;
        return this;
    }

    public Language addMedias(Media media) {
        this.medias.add(media);
        media.setLanguage(this);
        return this;
    }

    public Language removeMedias(Media media) {
        this.medias.remove(media);
        media.setLanguage(null);
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
        if (!(o instanceof Language)) {
            return false;
        }
        return id != null && id.equals(((Language) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", shortName='" + getShortName() + "'" +
            "}";
    }
}
