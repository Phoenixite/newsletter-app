<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Metrics</h2>
    <div>
      <h3 class="text-xl font-semibold mb-2">Newsletter Metrics</h3>
      <div ref="newsletterchart"></div>
      <ul>
        <li v-for="(count, newsletter) in metrics.newsletterMetrics" :key="newsletter">
          {{ newsletter }}: {{ count }}
        </li>
      </ul>
    </div>
    <div class="mt-4">
      <h3 class="text-xl font-semibold mb-2">Subscriber Metrics</h3>
      <div ref="subscriberchart"></div>
      <ul>
        <li v-for="(count, subscriber) in metrics.subscriberMetrics" :key="subscriber">
          {{ subscriber }}: {{ count }}
        </li>
      </ul>
    </div>
    <div class="mt-4">
      <h3 class="text-xl font-semibold mb-2">Emails Sent Last 7 Days (mock up data may be used)</h3>
      <div ref="dayschart"></div>
      <ul>
        <li v-for="(count, date) in metrics.emailsSentLast7Days" :key="date">
          {{ date }}: {{ count }}
        </li>
        <li>
          Total: {{ metrics.totalLast7Days }}
        </li>
      </ul>
    </div>
    <div class="mt-4">
      <p>Total Emails Sent: {{ metrics.totalEmailsSent }}</p>
      <p>Total Failed Emails: {{ metrics.totalFailedEmails }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getMetrics } from '../services/API.service';
import * as d3 from 'd3';


const metrics = ref({});

const newsletterchart = ref(null);
const subscriberchart = ref(null);
const dayschart = ref(null);

const pieChart = (data, el) => {
  const width = 400;
  const height = 200;
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal().domain(data.map(d => d.label)).range(data.map(d => d.color));

  const svg = d3.select(el.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const pie = d3.pie()
    .value(d => d.value);

  const arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  const arcs = svg.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.label));

  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .text(d => d.data.label);
}

const barchart = (data, el) => {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 800;
  const height = 400;

  const svg = d3.select(el.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .domain(data.map(d => d.date))
    .range([0, width])
    .padding(0.2);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height, 0]);

  svg.append('g')
    .call(d3.axisLeft(y));

  svg.selectAll('mybar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.date))
    .attr('y', d => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.count))
    .attr('fill', d => d.color);
}

onMounted(async () => {
  metrics.value = await getMetrics();

  const emailsSentLast7Days = metrics.value.emailsSentLast7Days;
  const total = emailsSentLast7Days.total;
  delete emailsSentLast7Days.total;
  metrics.value.totalLast7Days = total;

  pieChart([
    { label: 'Frogs', value: metrics.value.newsletterMetrics.frogs, color: '#4CAF50'},
    { label: 'Raccoons', value: metrics.value.newsletterMetrics.raccoons, color: '#555555'}
  ], newsletterchart);

  const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;
  pieChart(
    Object.entries(metrics.value.subscriberMetrics).map(([label, value]) => ({ label, value, color: randomColor() })),
    subscriberchart
  )

  barchart(
    Object.entries(emailsSentLast7Days).map(([date, count]) => ({ date, count, color: randomColor() })),
    dayschart
  );
});

</script>