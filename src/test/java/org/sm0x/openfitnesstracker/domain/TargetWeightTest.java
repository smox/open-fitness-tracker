package org.sm0x.openfitnesstracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.openfitnesstracker.web.rest.TestUtil;

public class TargetWeightTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TargetWeight.class);
        TargetWeight targetWeight1 = new TargetWeight();
        targetWeight1.setId(1L);
        TargetWeight targetWeight2 = new TargetWeight();
        targetWeight2.setId(targetWeight1.getId());
        assertThat(targetWeight1).isEqualTo(targetWeight2);
        targetWeight2.setId(2L);
        assertThat(targetWeight1).isNotEqualTo(targetWeight2);
        targetWeight1.setId(null);
        assertThat(targetWeight1).isNotEqualTo(targetWeight2);
    }
}
