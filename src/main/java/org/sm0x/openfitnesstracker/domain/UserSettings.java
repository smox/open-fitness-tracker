package org.sm0x.openfitnesstracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Duration;

/**
 * A UserSettings.
 */
@Entity
@Table(name = "user_settings")
public class UserSettings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "selected_theme")
    private String selectedTheme;

    @Column(name = "default_warmup_time")
    private Duration defaultWarmupTime;

    @Column(name = "default_pre_workout_time")
    private Duration defaultPreWorkoutTime;

    @Column(name = "default_set_count")
    private Integer defaultSetCount;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "userSettings", allowSetters = true)
    private Language selectedLanguage;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSelectedTheme() {
        return selectedTheme;
    }

    public UserSettings selectedTheme(String selectedTheme) {
        this.selectedTheme = selectedTheme;
        return this;
    }

    public void setSelectedTheme(String selectedTheme) {
        this.selectedTheme = selectedTheme;
    }

    public Duration getDefaultWarmupTime() {
        return defaultWarmupTime;
    }

    public UserSettings defaultWarmupTime(Duration defaultWarmupTime) {
        this.defaultWarmupTime = defaultWarmupTime;
        return this;
    }

    public void setDefaultWarmupTime(Duration defaultWarmupTime) {
        this.defaultWarmupTime = defaultWarmupTime;
    }

    public Duration getDefaultPreWorkoutTime() {
        return defaultPreWorkoutTime;
    }

    public UserSettings defaultPreWorkoutTime(Duration defaultPreWorkoutTime) {
        this.defaultPreWorkoutTime = defaultPreWorkoutTime;
        return this;
    }

    public void setDefaultPreWorkoutTime(Duration defaultPreWorkoutTime) {
        this.defaultPreWorkoutTime = defaultPreWorkoutTime;
    }

    public Integer getDefaultSetCount() {
        return defaultSetCount;
    }

    public UserSettings defaultSetCount(Integer defaultSetCount) {
        this.defaultSetCount = defaultSetCount;
        return this;
    }

    public void setDefaultSetCount(Integer defaultSetCount) {
        this.defaultSetCount = defaultSetCount;
    }

    public User getUser() {
        return user;
    }

    public UserSettings user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Language getSelectedLanguage() {
        return selectedLanguage;
    }

    public UserSettings selectedLanguage(Language language) {
        this.selectedLanguage = language;
        return this;
    }

    public void setSelectedLanguage(Language language) {
        this.selectedLanguage = language;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserSettings)) {
            return false;
        }
        return id != null && id.equals(((UserSettings) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserSettings{" +
            "id=" + getId() +
            ", selectedTheme='" + getSelectedTheme() + "'" +
            ", defaultWarmupTime='" + getDefaultWarmupTime() + "'" +
            ", defaultPreWorkoutTime='" + getDefaultPreWorkoutTime() + "'" +
            ", defaultSetCount=" + getDefaultSetCount() +
            "}";
    }
}
