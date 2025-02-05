import bot from "../config.js";
export const generateInviteLink = async (groupId) => {
    const link = await bot.createChatInviteLink(groupId, {
        expire_date: Date.now() + 3600,
        member_limit: 1,
    });
    return link;
};
export async function removeUserFromGroup(chatId, userId) {
    await bot.banChatMember(chatId, userId);
}
