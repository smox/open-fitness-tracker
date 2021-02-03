package org.sm0x.openfitnesstracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.openfitnesstracker.web.rest.TestUtil;

public class ApplicationSettingsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApplicationSettings.class);
        ApplicationSettings applicationSettings1 = new ApplicationSettings();
        applicationSettings1.setId(1L);
        ApplicationSettings applicationSettings2 = new ApplicationSettings();
        applicationSettings2.setId(applicationSettings1.getId());
        assertThat(applicationSettings1).isEqualTo(applicationSettings2);
        applicationSettings2.setId(2L);
        assertThat(applicationSettings1).isNotEqualTo(applicationSettings2);
        applicationSettings1.setId(null);
        assertThat(applicationSettings1).isNotEqualTo(applicationSettings2);
    }
}
