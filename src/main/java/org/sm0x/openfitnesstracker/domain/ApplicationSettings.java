package org.sm0x.openfitnesstracker.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Duration;

/**
 * A ApplicationSettings.
 */
@Entity
@Table(name = "application_settings")
public class ApplicationSettings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "default_theme")
    private String defaultTheme;

    @Column(name = "default_warmup_time")
    private Duration defaultWarmupTime;

    @Column(name = "default_pre_workout_time")
    private Duration defaultPreWorkoutTime;

    @Column(name = "default_set_count")
    private Integer defaultSetCount;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDefaultTheme() {
        return defaultTheme;
    }

    public ApplicationSettings defaultTheme(String defaultTheme) {
        this.defaultTheme = defaultTheme;
        return this;
    }

    public void setDefaultTheme(String defaultTheme) {
        this.defaultTheme = defaultTheme;
    }

    public Duration getDefaultWarmupTime() {
        return defaultWarmupTime;
    }

    public ApplicationSettings defaultWarmupTime(Duration defaultWarmupTime) {
        this.defaultWarmupTime = defaultWarmupTime;
        return this;
    }

    public void setDefaultWarmupTime(Duration defaultWarmupTime) {
        this.defaultWarmupTime = defaultWarmupTime;
    }

    public Duration getDefaultPreWorkoutTime() {
        return defaultPreWorkoutTime;
    }

    public ApplicationSettings defaultPreWorkoutTime(Duration defaultPreWorkoutTime) {
        this.defaultPreWorkoutTime = defaultPreWorkoutTime;
        return this;
    }

    public void setDefaultPreWorkoutTime(Duration defaultPreWorkoutTime) {
        this.defaultPreWorkoutTime = defaultPreWorkoutTime;
    }

    public Integer getDefaultSetCount() {
        return defaultSetCount;
    }

    public ApplicationSettings defaultSetCount(Integer defaultSetCount) {
        this.defaultSetCount = defaultSetCount;
        return this;
    }

    public void setDefaultSetCount(Integer defaultSetCount) {
        this.defaultSetCount = defaultSetCount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApplicationSettings)) {
            return false;
        }
        return id != null && id.equals(((ApplicationSettings) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApplicationSettings{" +
            "id=" + getId() +
            ", defaultTheme='" + getDefaultTheme() + "'" +
            ", defaultWarmupTime='" + getDefaultWarmupTime() + "'" +
            ", defaultPreWorkoutTime='" + getDefaultPreWorkoutTime() + "'" +
            ", defaultSetCount=" + getDefaultSetCount() +
            "}";
    }
}
