const CalenderEventsWrapper = (props) => {
  return (
    <div
      className="event-badge w-100 overflow-hidden text-left"
      title={props.title}
      onClick={(e) => {
        e.stopPropagation();
        props.copyExistedEvent();
        props.openEditableEvent();
      }}
    >
      {props.children}
    </div>
  );
};

const SidebarEventsWrapper = (props) => {
  return (
    <div
      className="px-2 py-2 w-100 overflow-hidden text-left mb-0 bg-white sidebarEventItem"
      title={props.title}
      onClick={(e) => {
        e.stopPropagation();
        props.copyExistedEvent();
        if (window.innerWidth < 1200) {
          props.togglSidebar();
        }
        props.openEditableEvent();
      }}
    >
      <div className="border-theme py-1">
        <div className="px-1 py-2 event-badge mb-0 bg-transparent event-inner">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export const renderEvents = (
  year,
  events,
  month,
  day,
  maxEventCount,
  copyExistedEvent,
  openEditableEvent,
  wrapperType,
  togglSidebar,
  eventsPaneOpen
) => {
  let LocalWrapper =
    wrapperType === "primaryWrapper"
      ? SidebarEventsWrapper
      : CalenderEventsWrapper;
  let patchedDay =
    parseInt(day) < 10 ? `0${parseInt(day)}` : `${parseInt(day)}`;
  const particularDateevents = events.data[year]
    ? events.data[year][month]
      ? events.data[year][month][patchedDay]
        ? {
            ...events.data[year][month][patchedDay],
          }
        : null
      : null
    : null;
  let evtOverFlow = false;
  let evtCount = 0;
  let evtArray = [];
  if (particularDateevents) {
    const allevents = Object.keys(particularDateevents);
    for (let i = 0; i < allevents.length && !evtOverFlow; i++) {
      const eventsOntime = [...particularDateevents[allevents[i]]];
      for (let j = 0; j < eventsOntime.length; j++) {
        if (evtCount >= maxEventCount) {
          evtOverFlow = true;
          evtArray.push(
            <div key="ellipsis" className="text-center">
              <span
                className="px-1 event-ellipse badge-inner-title pb-1"
                title="All Events"
                onClick={() => {
                  if (!eventsPaneOpen) {
                    togglSidebar();
                  }
                }}
              >
                . . .
              </span>
            </div>
          );
          break;
        }
        let { eTime, sTime, title } = { ...eventsOntime[j] };
        evtArray.push(
          <LocalWrapper
            key={title + j}
            title={`${title} from ${sTime} to ${eTime}`}
            copyExistedEvent={() => {
              copyExistedEvent({ ...eventsOntime[j] });
            }}
            openEditableEvent={() => {
              openEditableEvent();
            }}
            togglSidebar={() => {
              togglSidebar();
            }}
          >
            {sTime} <span className="badge-inner-title">{title}</span>
          </LocalWrapper>
        );

        evtCount++;
      }
    }
  }
  return evtArray;
};
