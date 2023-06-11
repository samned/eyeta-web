import React from 'react';
import {
  Divider, List, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import TodayIcon from '@mui/icons-material/Today';
import PublishIcon from '@mui/icons-material/Publish';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import {
  pink, orange, cyan, green, red,
} from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import {
  useAdministrator, useDeviceReadonly, useManager, useRestriction,
} from '../../common/util/permissions';
import useFeatures from '../../common/util/useFeatures';

const useStyles = makeStyles(() => ({
  ListItemButton: {
    root: {
      '&:hover': {
        backgroundColor: pink[100],
        color: pink[700],
      },
      '&$selected': {
        backgroundColor: orange[700],
        color: orange[700],
        '&:hover': {
          backgroundColor: cyan[500],
          color: green[700],
        },
      },
    },
  },
}));
const MenuItem = ({
  title, link, icon, selected,
}) => (
  <ListItemButton
    key={link}
    component={Link}
    to={link}
    selected={selected}
    sx={{
      '& svg': {
        color: red[500],
        transition: '0.2s',
        transform: 'translateX(0) rotate(0)',
      },
      '&:hover, &:focus': {
        bgcolor: 'unset',
        '& svg:first-of-type': {
          transform: 'translateX(4px) rotate(8deg) scale(1.1)',
        },
        '& svg:last-of-type': {
          right: 0,
          opacity: 1,
        },
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        height: '80%',
        display: 'block',
        left: 0,
        width: '1px',
        bgcolor: 'divider',
      },
    }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
);

const SettingsMenu = () => {
  const classes = useStyles();
  const t = useTranslation();
  const location = useLocation();

  const readonly = useRestriction('readonly');
  const deviceReadonly = useDeviceReadonly();
  const admin = useAdministrator();
  const manager = useManager();
  const userId = useSelector((state) => state.session.user.id);

  const features = useFeatures();

  return (
    <>
      <List>
        {admin && (
          <MenuItem
            classname={classes.meuListButton}
            title={t('sharedPreferences')}
            link="/settings/preferences"
            icon={<SettingsIcon />}
            selected={location.pathname === '/settings/preferences'}
          />
        )}
        {!readonly && (
          <>
            <MenuItem
              title={t('sharedNotifications')}
              link="/settings/notifications"
              icon={<NotificationsIcon />}
              selected={location.pathname.startsWith('/settings/notification')}
            />
            <MenuItem
              title={t('settingsUser')}
              link={`/settings/user/${userId}`}
              icon={<PersonIcon />}
              selected={location.pathname === `/settings/user/${userId}`}
            />
            {!deviceReadonly && (
              <MenuItem
                title={t('deviceTitle')}
                link="/settings/devices"
                icon={<SmartphoneIcon />}
                selected={location.pathname.startsWith('/settings/device')}
              />
            )}
            <MenuItem
              title={t('sharedGeofences')}
              link="/geofences"
              icon={<CreateIcon />}
              selected={location.pathname.startsWith('/settings/geofence')}
            />
            {!features.disableGroups && (
              <MenuItem
                title={t('settingsGroups')}
                link="/settings/groups"
                icon={<FolderIcon />}
                selected={location.pathname.startsWith('/settings/group')}
              />
            )}
            {!features.disableDrivers && (
              <MenuItem
                title={t('sharedDrivers')}
                link="/settings/drivers"
                icon={<PersonIcon />}
                selected={location.pathname.startsWith('/settings/driver')}
              />
            )}
            {!features.disableCalendars && (
              <MenuItem
                title={t('sharedCalendars')}
                link="/settings/calendars"
                icon={<TodayIcon />}
                selected={location.pathname.startsWith('/settings/calendar')}
              />
            )}
            {!features.disableComputedAttributes && admin && (
              <MenuItem
                title={t('sharedComputedAttributes')}
                link="/settings/attributes"
                icon={<StorageIcon />}
                selected={location.pathname.startsWith('/settings/attribute')}
              />
            )}
            {!features.disableMaintenance && admin && (
              <MenuItem
                title={t('sharedMaintenance')}
                link="/settings/maintenances"
                icon={<BuildIcon />}
                selected={location.pathname.startsWith('/settings/maintenance')}
              />
            )}
            <MenuItem
              title={t('sharedSavedCommands')}
              link="/settings/commands"
              icon={<PublishIcon />}
              selected={location.pathname.startsWith('/settings/command') && !location.pathname.startsWith('/settings/command-send')}
            />
          </>
        )}
      </List>
      {manager && (
        <>
          <Divider />
          <List>
            {admin && (
              <MenuItem
                title={t('settingsServer')}
                link="/settings/server"
                icon={<StorageIcon />}
                selected={location.pathname === '/settings/server'}
              />
            )}
            <MenuItem
              title={t('settingsUsers')}
              link="/settings/users"
              icon={<PeopleIcon />}
              selected={location.pathname.startsWith('/settings/user') && location.pathname !== `/settings/user/${userId}`}
            />
          </List>
        </>
      )}
    </>
  );
};

export default SettingsMenu;
