import { SYSTEM_ROLE } from '@deip/constants';
import { get } from 'lodash';

export const rolesFactory = (teamIdPath) => ({
  computed: {
    $$isTeamAdmin() {
      const id = get(this, teamIdPath);

      if (!id) return false;

      const scope = { name: 'teamId', id };
      return this.$currentUser.hasRole(SYSTEM_ROLE.TEAM_ADMIN, scope);
    }
  }
});
