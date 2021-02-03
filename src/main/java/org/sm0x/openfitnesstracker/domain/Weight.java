package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A general object which defines a weight.\namount: The amount of a specific unit
 */
@ApiModel(description = "A general object which defines a weight.\namount: The amount of a specific unit")
@Entity
@Table(name = "weight")
public class Weight implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @OneToOne(mappedBy = "weight")
    @JsonIgnore
    private TargetWeight targetWeight;

    @OneToOne(mappedBy = "weight")
    @JsonIgnore
    private ProtocolledWeight protocolledWeight;

    @OneToOne(mappedBy = "weight")
    @JsonIgnore
    private CompletedSet completedSet;

    @ManyToOne
    @JsonIgnoreProperties(value = "weights", allowSetters = true)
    private Unit units;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Weight amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public TargetWeight getTargetWeight() {
        return targetWeight;
    }

    public Weight targetWeight(TargetWeight targetWeight) {
        this.targetWeight = targetWeight;
        return this;
    }

    public void setTargetWeight(TargetWeight targetWeight) {
        this.targetWeight = targetWeight;
    }

    public ProtocolledWeight getProtocolledWeight() {
        return protocolledWeight;
    }

    public Weight protocolledWeight(ProtocolledWeight protocolledWeight) {
        this.protocolledWeight = protocolledWeight;
        return this;
    }

    public void setProtocolledWeight(ProtocolledWeight protocolledWeight) {
        this.protocolledWeight = protocolledWeight;
    }

    public CompletedSet getCompletedSet() {
        return completedSet;
    }

    public Weight completedSet(CompletedSet completedSet) {
        this.completedSet = completedSet;
        return this;
    }

    public void setCompletedSet(CompletedSet completedSet) {
        this.completedSet = completedSet;
    }

    public Unit getUnits() {
        return units;
    }

    public Weight units(Unit unit) {
        this.units = unit;
        return this;
    }

    public void setUnits(Unit unit) {
        this.units = unit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Weight)) {
            return false;
        }
        return id != null && id.equals(((Weight) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Weight{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            "}";
    }
}
