package org.sm0x.openfitnesstracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.openfitnesstracker.web.rest.TestUtil;

public class CompletedTrainingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompletedTraining.class);
        CompletedTraining completedTraining1 = new CompletedTraining();
        completedTraining1.setId(1L);
        CompletedTraining completedTraining2 = new CompletedTraining();
        completedTraining2.setId(completedTraining1.getId());
        assertThat(completedTraining1).isEqualTo(completedTraining2);
        completedTraining2.setId(2L);
        assertThat(completedTraining1).isNotEqualTo(completedTraining2);
        completedTraining1.setId(null);
        assertThat(completedTraining1).isNotEqualTo(completedTraining2);
    }
}
