package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Media.
 */
@Entity
@Table(name = "media")
public class Media implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "kind")
    private String kind;

    @Lob
    @Column(name = "binary_data")
    private byte[] binaryData;

    @Column(name = "binary_data_content_type")
    private String binaryDataContentType;

    @Column(name = "additional_information")
    private String additionalInformation;

    @ManyToOne
    @JsonIgnoreProperties(value = "media", allowSetters = true)
    private User user;

    @ManyToMany
    @JoinTable(name = "media_training_units",
               joinColumns = @JoinColumn(name = "media_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "training_units_id", referencedColumnName = "id"))
    private Set<TrainingUnit> trainingUnits = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "media_workouts",
               joinColumns = @JoinColumn(name = "media_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "workouts_id", referencedColumnName = "id"))
    private Set<Workout> workouts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "medias", allowSetters = true)
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

    public Media name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKind() {
        return kind;
    }

    public Media kind(String kind) {
        this.kind = kind;
        return this;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public byte[] getBinaryData() {
        return binaryData;
    }

    public Media binaryData(byte[] binaryData) {
        this.binaryData = binaryData;
        return this;
    }

    public void setBinaryData(byte[] binaryData) {
        this.binaryData = binaryData;
    }

    public String getBinaryDataContentType() {
        return binaryDataContentType;
    }

    public Media binaryDataContentType(String binaryDataContentType) {
        this.binaryDataContentType = binaryDataContentType;
        return this;
    }

    public void setBinaryDataContentType(String binaryDataContentType) {
        this.binaryDataContentType = binaryDataContentType;
    }

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public Media additionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
        return this;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public User getUser() {
        return user;
    }

    public Media user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<TrainingUnit> getTrainingUnits() {
        return trainingUnits;
    }

    public Media trainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
        return this;
    }

    public Media addTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.add(trainingUnit);
        trainingUnit.getMedias().add(this);
        return this;
    }

    public Media removeTrainingUnits(TrainingUnit trainingUnit) {
        this.trainingUnits.remove(trainingUnit);
        trainingUnit.getMedias().remove(this);
        return this;
    }

    public void setTrainingUnits(Set<TrainingUnit> trainingUnits) {
        this.trainingUnits = trainingUnits;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public Media workouts(Set<Workout> workouts) {
        this.workouts = workouts;
        return this;
    }

    public Media addWorkouts(Workout workout) {
        this.workouts.add(workout);
        workout.getMedias().add(this);
        return this;
    }

    public Media removeWorkouts(Workout workout) {
        this.workouts.remove(workout);
        workout.getMedias().remove(this);
        return this;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
    }

    public Language getLanguage() {
        return language;
    }

    public Media language(Language language) {
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
        if (!(o instanceof Media)) {
            return false;
        }
        return id != null && id.equals(((Media) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Media{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", kind='" + getKind() + "'" +
            ", binaryData='" + getBinaryData() + "'" +
            ", binaryDataContentType='" + getBinaryDataContentType() + "'" +
            ", additionalInformation='" + getAdditionalInformation() + "'" +
            "}";
    }
}
