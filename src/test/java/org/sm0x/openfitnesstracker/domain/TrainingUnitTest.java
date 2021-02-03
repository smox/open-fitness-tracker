package org.sm0x.openfitnesstracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.openfitnesstracker.web.rest.TestUtil;

public class TrainingUnitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingUnit.class);
        TrainingUnit trainingUnit1 = new TrainingUnit();
        trainingUnit1.setId(1L);
        TrainingUnit trainingUnit2 = new TrainingUnit();
        trainingUnit2.setId(trainingUnit1.getId());
        assertThat(trainingUnit1).isEqualTo(trainingUnit2);
        trainingUnit2.setId(2L);
        assertThat(trainingUnit1).isNotEqualTo(trainingUnit2);
        trainingUnit1.setId(null);
        assertThat(trainingUnit1).isNotEqualTo(trainingUnit2);
    }
}
