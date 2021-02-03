package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

/**
 * A Nutrition.
 */
@Entity
@Table(name = "nutrition")
public class Nutrition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "time")
    private ZonedDateTime time;

    @Column(name = "carbs", precision = 21, scale = 2)
    private BigDecimal carbs;

    @Column(name = "fat", precision = 21, scale = 2)
    private BigDecimal fat;

    @Column(name = "protein", precision = 21, scale = 2)
    private BigDecimal protein;

    @Column(name = "fiber", precision = 21, scale = 2)
    private BigDecimal fiber;

    @Column(name = "kcal", precision = 21, scale = 2)
    private BigDecimal kcal;

    @ManyToOne
    @JsonIgnoreProperties(value = "nutritions", allowSetters = true)
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

    public Nutrition time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public BigDecimal getCarbs() {
        return carbs;
    }

    public Nutrition carbs(BigDecimal carbs) {
        this.carbs = carbs;
        return this;
    }

    public void setCarbs(BigDecimal carbs) {
        this.carbs = carbs;
    }

    public BigDecimal getFat() {
        return fat;
    }

    public Nutrition fat(BigDecimal fat) {
        this.fat = fat;
        return this;
    }

    public void setFat(BigDecimal fat) {
        this.fat = fat;
    }

    public BigDecimal getProtein() {
        return protein;
    }

    public Nutrition protein(BigDecimal protein) {
        this.protein = protein;
        return this;
    }

    public void setProtein(BigDecimal protein) {
        this.protein = protein;
    }

    public BigDecimal getFiber() {
        return fiber;
    }

    public Nutrition fiber(BigDecimal fiber) {
        this.fiber = fiber;
        return this;
    }

    public void setFiber(BigDecimal fiber) {
        this.fiber = fiber;
    }

    public BigDecimal getKcal() {
        return kcal;
    }

    public Nutrition kcal(BigDecimal kcal) {
        this.kcal = kcal;
        return this;
    }

    public void setKcal(BigDecimal kcal) {
        this.kcal = kcal;
    }

    public User getUser() {
        return user;
    }

    public Nutrition user(User user) {
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
        if (!(o instanceof Nutrition)) {
            return false;
        }
        return id != null && id.equals(((Nutrition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Nutrition{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", carbs=" + getCarbs() +
            ", fat=" + getFat() +
            ", protein=" + getProtein() +
            ", fiber=" + getFiber() +
            ", kcal=" + getKcal() +
            "}";
    }
}
