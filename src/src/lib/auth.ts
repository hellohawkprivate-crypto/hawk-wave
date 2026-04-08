import { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { fetchAllowedDiscordIds } from './sheets'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: { scope: 'identify guilds guilds.members.read' },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const userId = account?.providerAccountId ?? ''

      // 1. Google Sheets の許可リストに含まれていれば許可
      const allowedIds = await fetchAllowedDiscordIds()
      if (allowedIds.includes(userId)) return true

      // 2. 指定サーバーのメンバーかつ対象ロールを持つか確認
      const guildId = process.env.DISCORD_GUILD_ID
      const staffRoleId = process.env.DISCORD_STAFF_ROLE_ID

      if (!guildId || !staffRoleId) return false

      const res = await fetch(
        `https://discord.com/api/guilds/${guildId}/members/${userId}`,
        { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
      )
      if (!res.ok) return false

      const member = await res.json()
      return member.roles.includes(staffRoleId)
    },
  },
}
