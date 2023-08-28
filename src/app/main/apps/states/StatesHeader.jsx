import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useStates from 'app/hooks/useStates';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const StatesHeader = () => {
  const { t } = useTranslation('statesApp');
  const { searchText, setSearchText } = useStates();

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        {t('TITLE')}
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder={t('PLACEHOLDER_SEARCH')}
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': t('SEARCH'),
            }}
            onChange={setSearchText}
          />
        </Paper>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            component={Link}
            to="/states/new"
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            disabled
          >
            {t('ADD')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default StatesHeader;
