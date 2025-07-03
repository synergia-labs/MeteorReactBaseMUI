import express, { Express } from "express";
import client, { Counter, Gauge, Histogram, Summary } from "prom-client";
import { hasValue } from "/imports/libs/hasValue";

const enablePrometheusMetrics = true;

class PrometheusMetrics {
	private app: Express;
	private port: number;
	private path: string;
	private metrics: Map<string, Histogram<string> | Counter<string> | Gauge<string> | Summary<string>>;

	constructor(port: number = 9100, path: string = "/metrics") {
		this.port = port;
		this.path = path;
		this.app = express();
		this.metrics = new Map();

		this.createHistogramMetric = this.createHistogramMetric.bind(this);
		this.createSummaryMetric = this.createSummaryMetric.bind(this);
		this.createCounterMetric = this.createCounterMetric.bind(this);
		this.startMetricsServer = this.startMetricsServer.bind(this);
		this.createGaugeMetric = this.createGaugeMetric.bind(this);
		this.callMetric = this.callMetric.bind(this);
		this.getMetric = this.getMetric.bind(this);
	}

	// Start the metrics server on the specified port (prometheus can scrape the metrics from this server)
	startMetricsServer() {
		if (!enablePrometheusMetrics) return;
		const collectDefaultMetrics = client.collectDefaultMetrics;
		collectDefaultMetrics();

		this.app.get(this.path, async (_: any, res: any) => {
			res.set("Content-Type", client.register.contentType);
			return res.send(await client.register.metrics());
		});

		this.app.listen(this.port, () => {
			console.info(`PROMETHEUS metrics server started at: http://localhost:${this.port}${this.path}`);
		});
	}

	// Create a new histogram metric
	createHistogramMetric(histogram: IHistogramMetric, call?: ICallMetric) {
		if (!enablePrometheusMetrics) return;

		const histogramMetric: Histogram<string> = this.metrics.has(histogram.name)
			? (this.metrics.get(histogram.name) as Histogram<string>)
			: new client.Histogram(histogram);

		if (!this.metrics.has(histogram.name)) this.metrics.set(histogram.name, histogramMetric);
		if (hasValue(call)) histogramMetric.observe(call!.labels, call!.value);

		return histogramMetric;
	}

	// Create a new counter metric
	createCounterMetric(counter: ICounterMetric, call?: ICallMetric) {
		if (!enablePrometheusMetrics) return;

		const counterMetric: Counter<string> = this.metrics.has(counter.name)
			? (this.metrics.get(counter.name) as Counter<string>)
			: new client.Counter(counter);

		if (!this.metrics.has(counter.name)) this.metrics.set(counter.name, counterMetric);
		if (hasValue(call)) counterMetric.inc(call!.labels, call!.value);

		return counterMetric;
	}

	// Create a new gauge metric
	createGaugeMetric(gauge: IGaugeMetric, call?: ICallMetric) {
		if (!enablePrometheusMetrics) return;

		const gaugeMetric: Gauge<string> = this.metrics.has(gauge.name)
			? (this.metrics.get(gauge.name) as Gauge<string>)
			: new client.Gauge(gauge);

		if (!this.metrics.has(gauge.name)) this.metrics.set(gauge.name, gaugeMetric);
		if (hasValue(call)) gaugeMetric.set(call!.labels, call!.value);

		return gaugeMetric;
	}

	// Create a new summary metric
	createSummaryMetric(summary: ISummaryMetric, call?: ICallMetric) {
		if (!enablePrometheusMetrics) return;

		const summaryMetric: Summary<string> = this.metrics.has(summary.name)
			? (this.metrics.get(summary.name) as Summary<string>)
			: new client.Summary(summary);

		if (!this.metrics.has(summary.name)) this.metrics.set(summary.name, summaryMetric);
		if (hasValue(call)) summaryMetric.observe(call!.labels, call!.value);

		return summaryMetric;
	}

	// Get a metric by name
	getMetric(name: string) {
		if (!enablePrometheusMetrics) return;
		return this.metrics.get(name);
	}

	// Call an existing metric
	callMetric(name: string, call: ICallMetric) {
		if (!this.metrics.has(name)) return;

		const metric = this.metrics.get(name);
		if (metric instanceof Histogram) {
			metric.observe(call.labels, call.value);
		} else if (metric instanceof Counter) {
			metric.inc(call.labels, call.value);
		} else if (metric instanceof Gauge) {
			metric.set(call.labels, call.value);
		} else if (metric instanceof Summary) {
			metric.observe(call.labels, call.value);
		}
	}
}

export interface IHistogramMetric {
	// The histogram metric is used to measure the distribution of the metric values
	name: string; // The name of the metric (must be unique) will be used in the prometheus query
	help: string; // The help text of the metric
	labelNames: string[]; // The labels of the metric (used to filter the metric in the prometheus query)
	buckets: number[]; // The buckets of the histogram metric (used to group the metric values)
}
export interface ICounterMetric {
	// Counter metric is used to count the number of times an event occurs
	name: string; // The name of the metric (must be unique) will be used in the prometheus query
	help: string; // The help text of the metric
	labelNames: string[]; // The labels of the metric (used to filter the metric in the prometheus query)
}
export interface IGaugeMetric {
	// Gauge metric is used to measure the value of a metric at a particular point in time (are similar to Counters but a Gauge's value can be decreased)
	name: string; // The name of the metric (must be unique) will be used in the prometheus query
	help: string; // The help text of the metric
	labelNames: string[]; // The labels of the metric (used to filter the metric in the prometheus query)
}
export interface ISummaryMetric {
	// Summary metric is used to measure the distribution of the metric values and provides a total count of the metric values (are similar to Histograms but they calculate the percentiles on the client side)
	name: string; // The name of the metric (must be unique) will be used in the prometheus query
	help: string; // The help text of the metric
	labelNames: string[]; // The labels of the metric (used to filter the metric in the prometheus query)
	percentiles: number[]; // The percentiles of the summary metric (used to group the metric values)
}
export interface ICallMetric {
	// Call metric is used to measure the duration of the metric values
	labels: { [key: string]: string | number }; // The labels of the metric (used to filter the metric in the prometheus query)
	value: number; // The value of the metric
}

export const prometheusMetrics = new PrometheusMetrics();
