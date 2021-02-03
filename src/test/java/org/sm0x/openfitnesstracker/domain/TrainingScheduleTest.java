package org.sm0x.openfitnesstracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.openfitnesstracker.web.rest.TestUtil;

public class TrainingScheduleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingSchedule.class);
        TrainingSchedule trainingSchedule1 = new TrainingSchedule();
        trainingSchedule1.setId(1L);
        TrainingSchedule trainingSchedule2 = new TrainingSchedule();
        trainingSchedule2.setId(trainingSchedule1.getId());
        assertThat(trainingSchedule1).isEqualTo(trainingSchedule2);
        trainingSchedule2.setId(2L);
        assertThat(trainingSchedule1).isNotEqualTo(trainingSchedule2);
        trainingSchedule1.setId(null);
        assertThat(trainingSchedule1).isNotEqualTo(trainingSchedule2);
    }
}
