package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * Defines the targed weight a user will archieve.\nparam startDate: The DateTime a user will start his/her goal\nparam endDate: The DateTime a user will archieve his/her goal
 */
@ApiModel(description = "Defines the targed weight a user will archieve.\nparam startDate: The DateTime a user will start his/her goal\nparam endDate: The DateTime a user will archieve his/her goal")
@Entity
@Table(name = "target_weight")
public class TargetWeight implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Weight weight;

    @ManyToOne
    @JsonIgnoreProperties(value = "targetWeights", allowSetters = true)
    private User user;

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

    public TargetWeight startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public TargetWeight endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Weight getWeight() {
        return weight;
    }

    public TargetWeight weight(Weight weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Weight weight) {
        this.weight = weight;
    }

    public User getUser() {
        return user;
    }

    public TargetWeight user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TargetWeight)) {
            return false;
        }
        return id != null && id.equals(((TargetWeight) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TargetWeight{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
