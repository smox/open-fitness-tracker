package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Workout.
 */
@Entity
@Table(name = "workout")
public class Workout implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "sets")
    private Integer sets;

    @OneToMany(mappedBy = "workouts")
    private Set<CompletedSet> completedSets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "workouts", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "workouts", allowSetters = true)
    private Language language;

    @ManyToMany(mappedBy = "workouts")
    @JsonIgnore
    private Set<TrainingUnit> trainingUnits = new HashSet<>();

    @ManyToMany(mappedBy = "workouts")
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

    public Workout name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSets() {
        return sets;
    }

    public Workout sets(Integer sets) {
        this.sets = sets;
        return this;
    }

    public void setSets(Integer sets) {
        this.sets = sets;
    }

    public Set<CompletedSet> getCompletedSets() {
        return completedSets;
    }

    public Workout completedSets(Set<CompletedSet> completedSets) {
        this.completedSets = completedSets;
        return this;
    }

    public Workout addCompletedSet(CompletedSet completedSet) {
        this.completedSets.add(completedSet);
        completedSet.setWorkouts(this);
        return this;
    }

    public Workout removeCompletedSet(CompletedSet completedSet) {
        this.completedSets.remove(completedSet);
        completedSet.setWorkouts(null);
        return this;
    }

    public void setCompletedSets(Set<CompletedSet> completedSets) {
        this.completedSets = completedSets;
    }

    public User getUser() {
        return user;
    }

    public Workout user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Language getLanguage() {
        return language;
    }

    public Workout language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<TrainingUnit> getTrainingUnits() {
        return trainingUnits;
    }

    public Workout trainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
        return this;
    }

    public Workout addTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.add(trainingUnit);
        trainingUnit.getWorkouts().add(this);
        return this;
    }

    public Workout removeTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.remove(trainingUnit);
        trainingUnit.getWorkouts().remove(this);
        return this;
    }

    public void setTrainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
    }

    public Set<Media> getMedias() {
        return medias;
    }

    public Workout medias(Set<Media> media) {
        this.medias = media;
        return this;
    }

    public Workout addMedias(Media media) {
        this.medias.add(media);
        media.getWorkouts().add(this);
        return this;
    }

    public Workout removeMedias(Media media) {
        this.medias.remove(media);
        media.getWorkouts().remove(this);
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
        if (!(o instanceof Workout)) {
            return false;
        }
        return id != null && id.equals(((Workout) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Workout{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", sets=" + getSets() +
            "}";
    }
}
