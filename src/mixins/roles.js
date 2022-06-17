import { SYSTEM_ROLE } from '@deip/constants';

export const rolesFactory = (teamIdPath, isDraft) => ({
  computed: {
    $$isTeamAdmin() {
      let id;
      if (!id && !isDraft) {
        id = this[teamIdPath];
        return false;
      }
      if (!id && isDraft) {
        id = this.project.issuedByTeam
        && this.$currentUser.teams.includes(this.project.issuer)
          ? this.project.issuer : false;
      }

      const scope = { name: 'teamId', id };
      return this.$currentUser.hasRole(SYSTEM_ROLE.TEAM_ADMIN, scope);
    }
  }
});
