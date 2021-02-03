package org.sm0x.openfitnesstracker.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.sm0x.openfitnesstracker.web.rest.TestUtil;

public class CompletedSetTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompletedSet.class);
        CompletedSet completedSet1 = new CompletedSet();
        completedSet1.setId(1L);
        CompletedSet completedSet2 = new CompletedSet();
        completedSet2.setId(completedSet1.getId());
        assertThat(completedSet1).isEqualTo(completedSet2);
        completedSet2.setId(2L);
        assertThat(completedSet1).isNotEqualTo(completedSet2);
        completedSet1.setId(null);
        assertThat(completedSet1).isNotEqualTo(completedSet2);
    }
}
