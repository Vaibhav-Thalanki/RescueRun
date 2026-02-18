
import { motion, AnimatePresence } from 'framer-motion';
import RequestCard, { RequestCardSkeleton } from './RequestCard';

export default function Sidebar({
  requests = [],
  loading,
  selectedRequestId,
  onRequestClick,
  crisisMode = false,
  children,
}) {
  const openAndFundedRequests = requests.filter(
    (r) => r.status === 'open' || r.status === 'funded'
  );
  const claimedRequests = requests.filter((r) => r.status === 'claimed');

  return (
    <div className="h-full flex flex-col bg-slate-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl relative z-[1000]">
       <div className="px-4 py-4 overflow-y-auto flex-1">
        <h2
          className={`text-lg font-semibold mb-3 px-3 py-2 rounded-xl ${
            crisisMode
              ? 'bg-red-600/90 text-white'
              : 'text-white'
          }`}
        >
          {crisisMode ? 'Urgent Need' : 'Nearby Requests'}
        </h2>
        {children}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <RequestCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-2 px-1 font-semibold">
                Open / Funded
              </h3>
              <motion.ul layout className="space-y-3" initial={false}>
                <AnimatePresence mode="popLayout">
                  {openAndFundedRequests.map((r) => (
                    <li key={r.id}>
                      <RequestCard
                        request={r}
                        onClick={onRequestClick}
                        isSelected={selectedRequestId === r.id}
                      />
                    </li>
                  ))}
                </AnimatePresence>
              </motion.ul>
              {!loading && openAndFundedRequests.length === 0 && (
                <p className="text-gray-500 text-sm px-1 py-2">No open requests in this area.</p>
              )}
            </div>

            {claimedRequests.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-2 px-1 font-semibold">
                  Claimed
                </h3>
                <motion.ul layout className="space-y-3" initial={false}>
                  <AnimatePresence mode="popLayout">
                    {claimedRequests.map((r) => (
                      <li key={r.id}>
                        <RequestCard
                          request={r}
                          onClick={onRequestClick}
                          isSelected={selectedRequestId === r.id}
                        />
                      </li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
