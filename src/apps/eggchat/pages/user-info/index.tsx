import React from 'react';
import useUserStore from '../../store/userStore';

const UserInfoPage: React.FC = () => {
  const store = useUserStore();

  const getAvatarChar = () => {
    if (store.avatar) {
      return store.avatar;
    }
    return store.displayName ? store.displayName.charAt(0) : '我';
  };

  return (
    <div className="dd-page-user-info">
      <div className="dd-page-title">我的面具</div>

      <div className="dd-user-info-avatar-section">
        <div className="dd-avatar-placeholder">
          {getAvatarChar()}
        </div>
      </div>

      <div className="dd-config-field">
        <label>昵称</label>
        <input
          className="dd-input"
          value={store.displayName}
          onChange={(e) => store.setDisplayName(e.target.value)}
          placeholder="请输入你的昵称"
        />
      </div>

      <div className="dd-config-field">
        <label>头像 (文字或 Emoji)</label>
        <input
          className="dd-input"
          value={store.avatar}
          onChange={(e) => store.setAvatar(e.target.value)}
          placeholder="请输入头像文字或 Emoji"
        />
      </div>

      <div className="dd-config-field">
        <label>角色描述</label>
        <textarea
          className="dd-textarea"
          value={store.description}
          onChange={(e) => store.setDescription(e.target.value)}
          placeholder="请输入你的角色面具描述..."
        />
      </div>
    </div>
  );
};

export default UserInfoPage;
