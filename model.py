import datetime

import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

infected_today = 15160
infected_two_weeks_ago = 653

population_size = 83042200
initially_infected = infected_today - infected_two_weeks_ago
initially_recovered = infected_two_weeks_ago
initially_susceptible = population_size - initially_infected - initially_recovered
contacts_per_person_per_day = 8
infection_rate_per_contact = 0.06
days_infectious = 5

beta = infection_rate_per_contact * contacts_per_person_per_day
gamma = 1 / days_infectious
R0 = beta / gamma

print("Contacts per person per day:", contacts_per_person_per_day)
print("Infection rate per contact:", infection_rate_per_contact)
print("Days infectious:", infection_rate_per_contact)
print("Beta", beta)
print("Gamma", gamma)
print("R0", R0)

# A grid of time points (in days)
plot_t = np.array(
    [datetime.date.today() + datetime.timedelta(days=i) for i in range(150)]
)
t = np.arange(150)

# The SIR model differential equations.
def deriv(y, t, N, beta, gamma):
    S, I, R = y
    dSdt = -beta * S * I / N
    dIdt = beta * S * I / N - gamma * I
    dRdt = gamma * I
    return dSdt, dIdt, dRdt


# Initial conditions vector
y0 = initially_susceptible, initially_infected, initially_recovered
# Integrate the SIR equations over the time grid, t.
ret = odeint(deriv, y0, t, args=(population_size, beta, gamma))
S, I, R = ret.T

# Plot the data on three separate curves for S(t), I(t) and R(t)
fig = plt.figure(facecolor="w")
ax = fig.add_subplot(111, axisbelow=True)
ax.plot(plot_t, S / 1000, alpha=0.5, lw=2, label="Susceptible")
ax.plot(plot_t, I / 1000, alpha=0.5, lw=2, label="Infected")
ax.plot(plot_t, R / 1000, alpha=0.5, lw=2, label="Recovered with immunity")
ax.set_xlabel("Time /days")
ax.set_ylabel("Number (1000s)")
# ax.set_ylim(0, 1.2)
ax.yaxis.set_tick_params(length=0)
ax.xaxis.set_tick_params(length=0)
ax.grid(b=True, which="major", c="w", lw=2, ls="-")
legend = ax.legend()
legend.get_frame().set_alpha(0.5)
for spine in ("top", "right", "bottom", "left"):
    ax.spines[spine].set_visible(False)
plt.show()

plt.plot(
    plot_t[1:],
    np.diff(I + R) / population_size,
    alpha=0.5,
    lw=2,
    label="Daily new infected",
)
plt.show()
