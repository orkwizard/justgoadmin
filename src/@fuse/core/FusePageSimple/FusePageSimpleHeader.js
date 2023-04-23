import clsx from 'clsx';

const FusePageSimpleHeader = props => {
  return (
    <div className={clsx('FusePageSimple-header', props.className)}>
      <div className="container">{props.header && props.header}</div>
    </div>
  );
};

export default FusePageSimpleHeader;
