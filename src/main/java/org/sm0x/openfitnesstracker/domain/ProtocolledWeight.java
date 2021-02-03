package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * Defines the daily protcolled weight a user has to an specific point in time.\nparam time: The point in time the user measures his/her weight.
 */
@ApiModel(description = "Defines the daily protcolled weight a user has to an specific point in time.\nparam time: The point in time the user measures his/her weight.")
@Entity
@Table(name = "protocolled_weight")
public class ProtocolledWeight implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "time")
    private ZonedDateTime time;

    @OneToOne
    @JoinColumn(unique = true)
    private Weight weight;

    @ManyToOne
    @JsonIgnoreProperties(value = "protocolledWeights", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public ProtocolledWeight time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Weight getWeight() {
        return weight;
    }

    public ProtocolledWeight weight(Weight weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Weight weight) {
        this.weight = weight;
    }

    public User getUser() {
        return user;
    }

    public ProtocolledWeight user(User user) {
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
        if (!(o instanceof ProtocolledWeight)) {
            return false;
        }
        return id != null && id.equals(((ProtocolledWeight) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProtocolledWeight{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            "}";
    }
}
