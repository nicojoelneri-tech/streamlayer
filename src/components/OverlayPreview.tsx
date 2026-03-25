import type { ModuleType } from '../types'

interface Props {
  modules: ModuleType[]
  primaryColor: string
  secondaryColor: string
  channelName: string
  style?: string
}

export default function OverlayPreview({ modules, primaryColor, secondaryColor, channelName }: Props) {
  const name = channelName || 'TuCanal'
  const pc = primaryColor
  const sc = secondaryColor

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-surface-700 bg-surface-950" style={{ fontSize: '0.55vw' }}>
      {/* Game background simulation */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(${pc}08 1px, transparent 1px),
              linear-gradient(90deg, ${pc}08 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-surface-700 text-[10px] tracking-widest uppercase">
          Gameplay Area
        </div>
      </div>

      {/* Top HUD bar */}
      {modules.includes('labels') && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-[4%] py-[1.5%]"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)`,
            borderBottom: `1px solid ${pc}30`,
          }}
        >
          <div className="flex items-center gap-[2%]">
            {/* Live indicator */}
            <div className="flex items-center gap-[4px] px-[6px] py-[2px] rounded-sm" style={{ border: `1px solid #ff4f5e50`, background: 'rgba(255,79,94,0.15)' }}>
              <div className="w-[5px] h-[5px] rounded-full bg-red-500" style={{ boxShadow: '0 0 6px rgba(255,79,94,0.8)', animation: 'pulse 1.5s infinite' }} />
              <span className="text-[7px] font-bold tracking-widest text-red-400 uppercase">Live</span>
            </div>
            {/* Metrics */}
            <div className="px-[6px] py-[2px]" style={{ background: `${pc}10`, border: `1px solid ${pc}18` }}>
              <span className="text-[6px] tracking-widest uppercase" style={{ color: `${pc}80` }}>viewers</span>
              <span className="block text-[10px] font-bold" style={{ color: pc }}>247</span>
            </div>
            <div className="px-[6px] py-[2px]" style={{ background: `${pc}10`, border: `1px solid ${pc}18` }}>
              <span className="text-[6px] tracking-widest uppercase" style={{ color: `${pc}80` }}>uptime</span>
              <span className="block text-[10px] font-bold" style={{ color: pc }}>02:14</span>
            </div>
          </div>

          {/* Channel name center */}
          <div
            className="flex items-center gap-[6px] px-[10px] py-[4px]"
            style={{
              background: `linear-gradient(135deg, ${pc}15, ${pc}05)`,
              border: `1px solid ${pc}30`,
              boxShadow: `0 0 12px ${pc}20`,
            }}
          >
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: `radial-gradient(circle, #fff, ${pc})`, boxShadow: `0 0 8px ${pc}` }} />
            <span className="text-[11px] font-extrabold tracking-[3px] uppercase" style={{ color: pc }}>{name}</span>
          </div>

          {/* Right metrics */}
          <div className="flex items-center gap-[2%]">
            <div className="px-[6px] py-[2px]" style={{ background: `${pc}10`, border: `1px solid ${pc}18` }}>
              <span className="text-[6px] tracking-widest uppercase" style={{ color: `${pc}80` }}>subs</span>
              <span className="block text-[10px] font-bold" style={{ color: pc }}>89</span>
            </div>
          </div>
        </div>
      )}

      {/* Game frame with corners */}
      <div
        className="absolute"
        style={{
          top: modules.includes('labels') ? '14%' : '4%',
          left: modules.includes('panels') ? '20%' : '4%',
          right: modules.includes('chat') ? '20%' : '4%',
          bottom: modules.includes('labels') ? '10%' : '4%',
          border: `1px solid ${pc}25`,
          boxShadow: `inset 0 0 20px ${pc}08`,
        }}
      >
        {/* Corner decorations */}
        {['top-0 left-0', 'top-0 right-0 scale-x-[-1]', 'bottom-0 left-0 scale-y-[-1]', 'bottom-0 right-0 scale-[-1]'].map((pos, i) => (
          <div key={i} className={`absolute ${pos}`}>
            <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
              <path d="M1 30V10C1 5 5 1 10 1H30" stroke={pc} strokeWidth="1.5" opacity="0.7" />
              <path d="M6 20V10C6 7 7 6 10 6H20" stroke={sc} strokeWidth="1" opacity="0.5" />
              <circle cx="1" cy="30" r="2" fill={pc} opacity="0.9" />
              <circle cx="30" cy="1" r="2" fill={pc} opacity="0.9" />
            </svg>
          </div>
        ))}
      </div>

      {/* Event Panel (left) */}
      {modules.includes('panels') && (
        <div
          className="absolute left-[2%] top-[16%] w-[17%]"
          style={{
            background: `rgba(0,0,0,0.75)`,
            border: `1px solid ${pc}28`,
            boxShadow: `0 0 10px ${pc}15`,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background: `linear-gradient(90deg, ${pc}, ${sc}, ${pc})` }}
          />
          <div className="px-[8px] py-[5px] flex justify-between items-center" style={{ borderBottom: `1px solid ${pc}15` }}>
            <span className="text-[6px] tracking-widest uppercase font-bold" style={{ color: pc }}>Event Feed</span>
            <span className="text-[5px] tracking-widest uppercase" style={{ color: `${pc}60` }}>core.sys</span>
          </div>
          <div className="p-[6px] space-y-[4px]">
            {[{ label: 'latest follow', value: 'NeonWolf' }, { label: 'latest sub', value: 'StarCipher' }, { label: 'latest tip', value: '$500' }].map((evt) => (
              <div key={evt.label} className="px-[6px] py-[4px]" style={{ background: `${pc}08`, borderLeft: `2px solid ${pc}40` }}>
                <span className="text-[5px] tracking-widest uppercase block" style={{ color: `${pc}60` }}>{evt.label}</span>
                <span className="text-[9px] font-bold block" style={{ color: pc }}>{evt.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Camera frame */}
      {modules.includes('camera') && (
        <div className="absolute bottom-[12%] left-[2%]">
          {/* Label */}
          <div
            className="flex items-center gap-[4px] mb-[2px] px-[6px] py-[2px] w-fit"
            style={{ background: 'rgba(0,0,0,0.75)', border: `1px solid ${pc}28` }}
          >
            <div className="w-[4px] h-[4px] rounded-full" style={{ background: pc, boxShadow: `0 0 6px ${pc}` }} />
            <span className="text-[5px] tracking-widest uppercase" style={{ color: pc }}>Operator Cam</span>
          </div>
          {/* Frame */}
          <div
            className="w-[22%] min-w-[80px] aspect-[16/9] relative"
            style={{
              border: `1.5px solid ${pc}40`,
              background: `rgba(0,0,0,0.35)`,
              boxShadow: `0 0 14px ${pc}25, inset 0 0 20px ${pc}08`,
            }}
          >
            {/* Inner border */}
            <div className="absolute inset-[3px]" style={{ border: `1px solid ${pc}50` }} />
            {/* Corner guides */}
            <div className="absolute top-[4px] left-[4px] w-[8px] h-[8px]" style={{ borderTop: `1.5px solid ${pc}`, borderLeft: `1.5px solid ${pc}` }} />
            <div className="absolute bottom-[4px] right-[4px] w-[8px] h-[8px]" style={{ borderBottom: `1.5px solid ${pc}`, borderRight: `1.5px solid ${pc}` }} />
            {/* Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full" style={{ border: `1px solid ${pc}20` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[0.5px]" style={{ background: `${pc}30` }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.5px] h-[12px]" style={{ background: `${pc}30` }} />
            </div>
            <div className="flex h-full items-center justify-center text-[7px] tracking-wider uppercase" style={{ color: `${pc}40` }}>
              CAM
            </div>
          </div>
        </div>
      )}

      {/* Chat panel (right) */}
      {modules.includes('chat') && (
        <div
          className="absolute top-[16%] right-[2%] w-[17%] h-[65%]"
          style={{
            background: `rgba(0,0,0,0.75)`,
            border: `1px solid ${pc}28`,
            boxShadow: `0 0 10px ${pc}15`,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div className="px-[8px] py-[5px] flex justify-between items-center" style={{ borderBottom: `1px solid ${pc}15`, background: `${pc}08` }}>
            <span className="text-[6px] tracking-widest uppercase font-bold" style={{ color: pc }}>Stream Chat</span>
            <span className="text-[5px] tracking-widest uppercase" style={{ color: '#ffd86b' }}>247 online</span>
          </div>
          <div className="p-[6px] space-y-[4px]">
            {[
              { user: 'NEON_WOLF', text: 'ese pull fue una locura' },
              { user: 'STAR_CIPHER', text: 'hoy sale 5 estrellas' },
              { user: 'VOIDRUNNER', text: 'muy bueno el overlay' },
            ].map((msg, i) => (
              <div key={i} className="px-[5px] py-[3px]" style={{ background: `${pc}06`, borderLeft: `1.5px solid ${pc}35` }}>
                <span className="text-[5px] font-bold uppercase block" style={{ color: sc }}>{msg.user}</span>
                <span className="text-[7px] block" style={{ color: 'rgba(235,244,255,0.75)' }}>{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      {modules.includes('alerts') && (
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2">
          <div
            className="px-[12px] py-[6px] relative"
            style={{
              background: 'rgba(0,0,0,0.85)',
              border: `1px solid ${pc}35`,
              boxShadow: `0 0 16px ${pc}25`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px]"
              style={{ background: `linear-gradient(90deg, ${pc}, ${sc}, ${pc})` }}
            />
            <div className="flex items-center gap-[6px]">
              <div className="w-[12px] h-[12px] rounded-full" style={{ background: `radial-gradient(circle, #fff, ${pc})`, boxShadow: `0 0 8px ${pc}60` }} />
              <div>
                <span className="text-[5px] tracking-widest uppercase block" style={{ color: pc }}>New Follow</span>
                <span className="text-[10px] font-bold block text-white">NeonWolf</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Starting Soon indicator */}
      {modules.includes('starting') && !modules.includes('labels') && (
        <div
          className="absolute right-[3%] top-[4%] px-[8px] py-[3px]"
          style={{ background: `${sc}20`, border: `1px solid ${sc}40`, color: sc }}
        >
          <span className="text-[6px] tracking-widest uppercase font-bold">Starting Soon</span>
        </div>
      )}

      {/* Bottom ticker */}
      {modules.includes('labels') && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[6%] flex items-center"
          style={{
            background: 'rgba(0,0,0,0.85)',
            borderTop: `1px solid ${pc}28`,
          }}
        >
          <div
            className="h-full flex items-center px-[10px] shrink-0"
            style={{ background: `linear-gradient(90deg, ${pc}, ${pc}cc)`, color: '#050f1a' }}
          >
            <span className="text-[6px] font-extrabold tracking-widest uppercase">sys.log</span>
          </div>
          <div className="flex-1 overflow-hidden px-[8px]">
            <span className="text-[7px] whitespace-nowrap" style={{ color: 'rgba(235,244,255,0.7)' }}>
              ⚡ <span style={{ color: pc }} className="font-bold">NeonWolf</span> se suscribió por 3 meses
              &nbsp;&nbsp;&nbsp;&nbsp;💬 Escribí <span style={{ color: pc }} className="font-bold">!discord</span> para unirte
              &nbsp;&nbsp;&nbsp;&nbsp;🚀 Nuevo objetivo: <span style={{ color: pc }} className="font-bold">500 subs</span>
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  )
}
